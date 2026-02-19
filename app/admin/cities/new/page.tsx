'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Upload, message, Card, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'

export default function NewCityPage() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [bannerUrl, setBannerUrl] = useState('')
  const [galleryUrls, setGalleryUrls] = useState<string[]>([])
  const [bannerFile, setBannerFile] = useState<UploadFile[]>([])
  const [galleryFiles, setGalleryFiles] = useState<UploadFile[]>([])

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const signRes = await fetch('/api/cloudinary/signature', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: 'jashn/cities' })
    })
    if (!signRes.ok) throw new Error('Failed to get signature')
    const { timestamp, signature, cloudName, apiKey, folder } = await signRes.json()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)
    formData.append('api_key', apiKey)
    formData.append('folder', folder)
    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: formData })
    if (!uploadRes.ok) throw new Error('Upload failed')
    const data = await uploadRes.json()
    return data.secure_url
  }

  const handleBannerUpload = async ({ file, onSuccess, onError }: any) => {
    try {
      const url = await uploadToCloudinary(file)
      setBannerUrl(url)
      onSuccess(url)
      message.success('Banner uploaded')
    } catch (error) {
      onError(error)
      message.error('Upload failed')
    }
  }

  const handleGalleryUpload = async ({ file, onSuccess, onError }: any) => {
    try {
      const url = await uploadToCloudinary(file)
      setGalleryUrls(prev => [...prev, url])
      onSuccess(url)
      message.success('Image uploaded')
    } catch (error) {
      onError(error)
      message.error('Upload failed')
    }
  }

  const onFinish = async (values: any) => {
    if (!bannerUrl) return message.error('Banner image required')
    setLoading(true)
    try {
      const res = await fetch('/api/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, bannerImage: bannerUrl, gallery: galleryUrls }),
      })
      if (!res.ok) throw new Error('Failed to create city')
      message.success('City created successfully')
      router.push('/admin/cities')
    } catch (error) {
      message.error('Failed to create city')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '8px' }}>
      <Card title="Create New City" bordered={false}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="City Name" name="name" rules={[{ required: true, message: 'Required' }]}>
            <Input size="large" placeholder="Enter city name" />
          </Form.Item>
          <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Required' }]} extra="URL-friendly name">
            <Input size="large" placeholder="jaipur" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Required' }]}>
            <Input.TextArea rows={6} placeholder="City description" />
          </Form.Item>
          <Form.Item label="Banner Image" required>
            <Upload listType="picture-card" fileList={bannerFile} customRequest={handleBannerUpload} onChange={({ fileList }) => setBannerFile(fileList)} onRemove={() => setBannerUrl('')} maxCount={1}>
              {bannerFile.length === 0 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
            </Upload>
          </Form.Item>
          <Form.Item label="Gallery Images">
            <Upload listType="picture-card" fileList={galleryFiles} customRequest={handleGalleryUpload} onChange={({ fileList }) => setGalleryFiles(fileList)} onRemove={(file) => { const idx = galleryFiles.indexOf(file); setGalleryUrls(prev => prev.filter((_, i) => i !== idx)) }} multiple>
              {galleryFiles.length < 10 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} size="large">Create City</Button>
              <Button size="large" onClick={() => router.back()}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Upload, message, Card, Space, Select } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'

export default function NewPackagePage() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch('/api/cities').then(r => r.json()).then(d => setCities(d.data || []))
  }, [])

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const signRes = await fetch('/api/cloudinary/signature', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: 'jashn/packages' })
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

  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    try {
      const url = await uploadToCloudinary(file)
      setImageUrls(prev => [...prev, url])
      onSuccess(url)
      message.success('Image uploaded')
    } catch (error) {
      onError(error)
      message.error('Upload failed')
    }
  }

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, images: imageUrls }),
      })
      if (!res.ok) throw new Error('Failed to create package')
      message.success('Package created successfully')
      router.push('/admin/packages')
    } catch (error) {
      message.error('Failed to create package')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '8px' }}>
      <Card title="Create New Package" bordered={false}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ included: [''], excluded: [''], itinerary: [{ day: 1, title: '', description: '' }] }}>
          <Form.Item label="Package Title" name="title" rules={[{ required: true, message: 'Required' }]}>
            <Input size="large" placeholder="Enter package title" />
          </Form.Item>
          <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Required' }]}>
            <Input size="large" placeholder="golden-triangle-tour" />
          </Form.Item>
          <Form.Item label="City" name="cityId" rules={[{ required: true, message: 'Required' }]}>
            <Select size="large" placeholder="Select city">
              {cities.map((city: any) => <Select.Option key={city._id} value={city._id}>{city.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Duration" name="duration" rules={[{ required: true, message: 'Required' }]}>
            <Input size="large" placeholder="3 Days 2 Nights" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Required' }]}>
            <Input.TextArea rows={6} placeholder="Package description" />
          </Form.Item>
          <Form.Item label="Package Images">
            <Upload listType="picture-card" fileList={fileList} customRequest={handleUpload} onChange={({ fileList }) => setFileList(fileList)} onRemove={(file) => { const idx = fileList.indexOf(file); setImageUrls(prev => prev.filter((_, i) => i !== idx)) }} multiple>
              {fileList.length < 10 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
            </Upload>
          </Form.Item>
          <Form.List name="included">
            {(fields, { add, remove }) => (
              <>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Included</div>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item {...field} noStyle><Input placeholder="Inclusion" /></Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>Add Inclusion</Button>
              </>
            )}
          </Form.List>
          <Form.List name="excluded">
            {(fields, { add, remove }) => (
              <>
                <div style={{ fontWeight: 600, marginBottom: 8, marginTop: 16 }}>Excluded</div>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item {...field} noStyle><Input placeholder="Exclusion" /></Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>Add Exclusion</Button>
              </>
            )}
          </Form.List>
          <Form.List name="itinerary">
            {(fields, { add, remove }) => (
              <>
                <div style={{ fontWeight: 600, marginBottom: 8, marginTop: 16 }}>Itinerary</div>
                {fields.map(field => (
                  <Card key={field.key} size="small" style={{ marginBottom: 8 }}>
                    <Form.Item {...field} name={[field.name, 'day']} label="Day" rules={[{ required: true }]}>
                      <Input type="number" placeholder="1" />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, 'title']} label="Title" rules={[{ required: true }]}>
                      <Input placeholder="Day title" />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, 'description']} label="Description" rules={[{ required: true }]}>
                      <Input.TextArea rows={2} placeholder="Day description" />
                    </Form.Item>
                    <Button danger onClick={() => remove(field.name)}>Remove Day</Button>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>Add Day</Button>
              </>
            )}
          </Form.List>
          <Form.Item style={{ marginTop: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} size="large">Create Package</Button>
              <Button size="large" onClick={() => router.back()}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

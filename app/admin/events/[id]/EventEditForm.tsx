'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Upload, message, Card, Switch, Space, Select, Popconfirm } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'

export default function EventEditForm({ event }: { event: any }) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(event.images || [])
  const [fileList, setFileList] = useState<UploadFile[]>(
    (event.images || []).map((url: string, index: number) => ({
      uid: `-${index}`,
      name: `image-${index}`,
      status: 'done',
      url,
    }))
  )

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const signRes = await fetch('/api/cloudinary/signature', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder: 'jashn/events' })
    })
    if (!signRes.ok) throw new Error('Failed to get signature')
    
    const { timestamp, signature, cloudName, apiKey, folder } = await signRes.json()
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)
    formData.append('api_key', apiKey)
    formData.append('folder', folder)
    
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    )
    
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

  const handleRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file)
    if (index > -1) {
      setImageUrls(prev => prev.filter((_, i) => i !== index))
    }
  }

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const payload = {
        ...values,
        images: imageUrls,
        tags: values.tags || [],
        featured: values.featured || false,
      }

      const res = await fetch(`/api/events?id=${event._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update event')
      
      message.success('Event updated successfully')
      router.push('/admin/events')
      router.refresh()
    } catch (error: any) {
      message.error(error.message || 'Failed to update event')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/events?id=${event._id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      message.success('Event deleted')
      router.push('/admin/events')
    } catch (error) {
      message.error('Failed to delete event')
    }
  }

  return (
    <div style={{ padding: '8px' }}>
      <Card title="Edit Event" bordered={false}>
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={onFinish} 
          initialValues={{
            title: event.title,
            slug: event.slug,
            shortDescription: event.shortDescription,
            description: event.description,
            tags: event.tags || [],
            featured: event.featured || false,
          }}
        >
          <Form.Item label="Event Title" name="title" rules={[{ required: true, message: 'Required' }]}>
            <Input size="large" placeholder="Enter event title" />
          </Form.Item>

          <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Required' }]} extra="URL-friendly name">
            <Input size="large" placeholder="wedding-planning" />
          </Form.Item>

          <Form.Item label="Short Description" name="shortDescription" rules={[{ required: true, message: 'Required' }]}>
            <Input.TextArea rows={2} placeholder="Brief description (max 200 chars)" maxLength={200} />
          </Form.Item>

          <Form.Item label="Full Description" name="description" rules={[{ required: true, message: 'Required' }]}>
            <Input.TextArea rows={6} placeholder="Detailed description" />
          </Form.Item>

          <Form.Item label="Event Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={handleUpload}
              onChange={({ fileList }) => setFileList(fileList)}
              onRemove={handleRemove}
              accept="image/*"
              multiple
            >
              {fileList.length < 10 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select mode="tags" placeholder="Add tags" size="large" />
          </Form.Item>

          <Form.Item label="Featured Event" name="featured" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} size="large">
                Update Event
              </Button>
              <Button size="large" onClick={() => router.back()}>
                Cancel
              </Button>
              <Popconfirm
                title="Delete this event?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />} size="large">
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

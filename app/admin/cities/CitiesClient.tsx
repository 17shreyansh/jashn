'use client'

import { useState } from 'react'
import { Table, Button, Space, Tag, Image, Input, Card, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, StarFilled } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

export default function CitiesClient({ cities }: { cities: any[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async (id: string) => {
    setLoading(id)
    try {
      const res = await fetch(`/api/cities?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      message.success('City deleted')
      router.refresh()
    } catch (error) {
      message.error('Failed to delete city')
    } finally {
      setLoading(null)
    }
  }

  const columns = [
    {
      title: 'City',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <Space>
          <Image src={record.bannerImage || '/placeholder.jpg'} alt={record.name} width={60} height={60} style={{ objectFit: 'cover', borderRadius: 8 }} preview={false} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {record.name}
              {record.featured && <StarFilled style={{ color: '#faad14', marginLeft: 8 }} />}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>{record.description?.slice(0, 60)}...</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Gallery',
      dataIndex: 'gallery',
      key: 'gallery',
      render: (gallery: string[]) => <span>{gallery?.length || 0} images</span>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: any) => <Tag color={record.featured ? 'gold' : 'blue'}>{record.featured ? 'Featured' : 'Active'}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => window.open(`/cities/${record.slug}`, '_blank')} />
          <Button icon={<EditOutlined />} onClick={() => router.push(`/admin/cities/${record._id}`)} />
          <Popconfirm title="Delete this city?" onConfirm={() => handleDelete(record._id)} okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined />} danger loading={loading === record._id} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 8 }}>Cities Management</h1>
          <p style={{ color: '#666', margin: 0 }}>Manage travel destinations and city guides</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => router.push('/admin/cities/new')} block style={{ maxWidth: 300 }}>Add City</Button>
      </div>
      <Card>
        <Input.Search placeholder="Search cities..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 16 }} size="large" />
        <Table columns={columns} dataSource={filteredCities} rowKey="_id" pagination={{ pageSize: 10 }} scroll={{ x: 800 }} />
      </Card>
    </div>
  )
}

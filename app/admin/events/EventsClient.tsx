'use client'

import { useState } from 'react'
import { Table, Button, Space, Tag, Image, Input, Card, Popconfirm, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

export default function EventsClient({ events }: { events: any[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    setLoading(id)
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      message.success('Event deleted')
      router.refresh()
    } catch (error) {
      message.error('Failed to delete event')
    } finally {
      setLoading(null)
    }
  }

  const columns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: any) => (
        <Space>
          <Image
            src={record.images[0] || '/placeholder.jpg'}
            alt={record.title}
            width={60}
            height={60}
            style={{ objectFit: 'cover', borderRadius: 8 }}
            preview={false}
          />
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              {record.title}
              {record.featured && <StarFilled style={{ color: '#faad14', marginLeft: 8 }} />}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>
              {record.shortDescription?.slice(0, 60)}...
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags?.slice(0, 3).map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {tags?.length > 3 && <Tag>+{tags.length - 3}</Tag>}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record.featured ? 'gold' : 'blue'}>
          {record.featured ? 'Featured' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => window.open(`/events/${record.slug}`, '_blank')}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/events/${record._id}`)}
          />
          <Popconfirm
            title="Delete this event?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              loading={loading === record._id}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 8 }}>Events Management</h1>
          <p style={{ color: '#666', margin: 0 }}>Manage your event portfolio and showcase</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => router.push('/admin/events/new')}
          block
          style={{ maxWidth: 300 }}
        >
          Create Event
        </Button>
      </div>

      <Card>
        <Input.Search
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: 16 }}
          size="large"
        />
        <Table
          columns={columns}
          dataSource={filteredEvents}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
}

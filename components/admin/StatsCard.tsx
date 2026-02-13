'use client'

import { Box, Typography, Chip } from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'
import { themeConfig } from '@/lib/config/theme'

interface StatsCardProps {
  label: string
  value: number | string
  icon: React.ElementType
  color: string
  change?: string
  trend?: 'up' | 'down'
}

export default function StatsCard({ label, value, icon: Icon, color, change, trend = 'up' }: StatsCardProps) {
  return (
    <Card sx={{ p: 3, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, transition: 'all 0.3s', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.12)', transform: 'translateY(-4px)' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ width: 56, height: 56, borderRadius: 2.5, bgcolor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon sx={{ color, fontSize: 28 }} />
        </Box>
        {change && (
          <Chip
            label={change}
            size="small"
            sx={{ bgcolor: trend === 'up' ? '#10b98115' : '#ef444415', color: trend === 'up' ? '#10b981' : '#ef4444', fontWeight: 600, fontSize: '0.75rem', height: 26 }}
            icon={trend === 'up' ? <TrendingUp sx={{ fontSize: 14 }} /> : <TrendingDown sx={{ fontSize: 14 }} />}
          />
        )}
      </Box>
      <Typography sx={{ fontSize: '2.25rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5, lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, fontWeight: 500 }}>{label}</Typography>
    </Card>
  )
}

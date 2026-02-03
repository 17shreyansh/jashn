'use client'

import { Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Container } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventIcon from '@mui/icons-material/Event'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import CardTravelIcon from '@mui/icons-material/CardTravel'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import EmailIcon from '@mui/icons-material/Email'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const drawerWidth = 260

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { href: '/admin/events', label: 'Events', icon: <EventIcon /> },
  { href: '/admin/cities', label: 'Cities', icon: <LocationCityIcon /> },
  { href: '/admin/packages', label: 'Packages', icon: <CardTravelIcon /> },
  { href: '/admin/gallery', label: 'Gallery', icon: <PhotoLibraryIcon /> },
  { href: '/admin/leads', label: 'Leads', icon: <EmailIcon /> },
]

export default function AdminLayout({ children, userEmail, onLogout }: { children: ReactNode; userEmail?: string; onLogout?: () => void }) {
  const pathname = usePathname()

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fef8e8' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #a7ba42, #95ccba)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'var(--font-playfair)',
              fontWeight: 700,
              fontSize: '1.25rem'
            }}>
              J
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'text.primary' }}>
              Admin Panel
            </Typography>
          </Box>
          {userEmail && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{userEmail}</Typography>
              {onLogout && <Button onClick={onLogout} variant="outlined" size="small">Logout</Button>}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', mt: 8, bgcolor: 'white', borderRight: '1px solid rgba(0,0,0,0.08)' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname.startsWith(item.href)}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': { bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } },
                    '&.Mui-selected .MuiListItemIcon-root': { color: 'white' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </Box>
  )
}

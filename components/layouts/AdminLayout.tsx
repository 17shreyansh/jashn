'use client'

import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Menu, MenuItem, Divider } from '@mui/material'
import { Dashboard, Event, LocationCity, CardTravel, PhotoLibrary, Email, Logout, Settings, Menu as MenuIcon } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { themeConfig } from '@/lib/config/theme'

const drawerWidth = 280

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { href: '/admin/events', label: 'Events', icon: <Event /> },
  { href: '/admin/cities', label: 'Cities', icon: <LocationCity /> },
  { href: '/admin/packages', label: 'Packages', icon: <CardTravel /> },
  { href: '/admin/gallery', label: 'Gallery', icon: <PhotoLibrary /> },
  { href: '/admin/leads', label: 'Leads', icon: <Email /> },
]

export default function AdminLayout({ children, userEmail, onLogout }: { children: ReactNode; userEmail?: string; onLogout?: () => void }) {
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          <IconButton sx={{ mr: 2, display: { md: 'none' }, color: themeConfig.colors.textDark }} onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: '1.5rem', fontWeight: 700, color: themeConfig.colors.textDark }}>
              Jashn
            </Typography>
            <Box sx={{ width: 1, height: 20, bgcolor: '#e5e7eb' }} />
            <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, fontWeight: 500 }}>Admin</Typography>
          </Box>
          
          {userEmail && (
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: themeConfig.colors.primary, fontSize: '0.875rem', fontWeight: 600 }}>
                {userEmail[0].toUpperCase()}
              </Avatar>
            </IconButton>
          )}
          
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: themeConfig.colors.textDark }}>{userEmail}</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: themeConfig.colors.textLight }}>Administrator</Typography>
            </Box>
            <Divider />
            <MenuItem component={Link} href="/admin/settings" onClick={() => setAnchorEl(null)}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>
            {onLogout && (
              <MenuItem onClick={() => { onLogout(); setAnchorEl(null); }}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'white', borderRight: '1px solid #e5e7eb' },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2, overflow: 'auto' }}>
          <List sx={{ px: 0 }}>
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <ListItem key={item.href} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    sx={{
                      borderRadius: 2,
                      py: 1.25,
                      bgcolor: isActive ? `${themeConfig.colors.primary}10` : 'transparent',
                      color: isActive ? themeConfig.colors.primary : themeConfig.colors.textLight,
                      '&:hover': { bgcolor: isActive ? `${themeConfig.colors.primary}15` : '#f8f9fa' },
                      '& .MuiListItemIcon-root': { color: isActive ? themeConfig.colors.primary : themeConfig.colors.textLight, minWidth: 40 }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9375rem', fontWeight: isActive ? 600 : 500 }} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}>
        <Toolbar />
        <Box sx={{ p: 2, overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding sx={{ mb: 1 }}>
                <ListItemButton component={Link} href={item.href} onClick={() => setMobileOpen(false)} sx={{ borderRadius: 2 }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AppBar, Toolbar, Box, Button, IconButton, Drawer, 
  List, ListItem, ListItemButton, ListItemText, Container 
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { themeConfig } from '@/lib/config/theme'

const links = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/tours', label: 'Tours' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
]

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AppBar 
        component={motion.div}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        position="fixed" 
        elevation={0}
        sx={{ 
          bgcolor: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? themeConfig.colors.luxury : 'rgba(242,204,132,0.2)'}`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: scrolled ? 1.5 : 2.5, transition: 'all 0.4s ease' }}>
            
            {/* Luxury Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box component={motion.div} whileHover={{ scale: 1.05 }}>
                <Image src="/logo.png" alt="Jashn Planners" width={300} height={100} style={{ height: '90px', width: 'auto'}} />
              </Box>
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {links.map((link) => (
                <Box
                  key={link.href}
                  component={motion.div}
                  whileHover={{ y: -2 }}
                >
                  <Button 
                    component={Link} 
                    href={link.href} 
                    disableRipple
                    sx={{
                      color: pathname === link.href ? themeConfig.colors.luxury : themeConfig.colors.white,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                      px: 3,
                      py: 1,
                      position: 'relative',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: themeConfig.colors.luxury,
                        bgcolor: 'transparent',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: pathname === link.href ? '40%' : '0%',
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${themeConfig.colors.luxury}, transparent)`,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      },
                      '&:hover::after': {
                        width: '40%',
                      }
                    }}
                  >
                    {link.label}
                  </Button>
                </Box>
              ))}
              
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  component={Link} 
                  href="/contact" 
                  variant="contained"
                  disableElevation
                  sx={{ 
                    ml: 3, px: 5, py: 1.3,
                    borderRadius: '50px',
                    background: `linear-gradient(135deg, ${themeConfig.colors.luxury} 0%, ${themeConfig.colors.secondary} 100%)`,
                    color: themeConfig.colors.black,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    boxShadow: `0 4px 20px ${themeConfig.colors.luxury}40`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${themeConfig.colors.secondary} 0%, ${themeConfig.colors.luxury} 100%)`,
                      boxShadow: `0 6px 30px ${themeConfig.colors.luxury}60`,
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>

            {/* Mobile Toggle */}
            <IconButton 
              component={motion.div}
              whileTap={{ scale: 0.9 }}
              sx={{ 
                display: { xs: 'flex', lg: 'none' }, 
                color: themeConfig.colors.luxury,
                border: `1px solid ${themeConfig.colors.luxury}40`,
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: `${themeConfig.colors.luxury}20`
                }
              }} 
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Luxury Mobile Drawer */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{ 
          sx: { 
            width: '100%', 
            maxWidth: 400, 
            background: `linear-gradient(135deg, ${themeConfig.colors.black} 0%, #1a1a1a 100%)`,
            borderLeft: `1px solid ${themeConfig.colors.luxury}40`
          } 
        }}
      >
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box 
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 10 }}
          >
            <Box sx={{ 
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: themeConfig.colors.luxury
            }}>
              Menu
            </Box>
            <IconButton 
              onClick={() => setOpen(false)} 
              sx={{ 
                color: themeConfig.colors.luxury,
                border: `1px solid ${themeConfig.colors.luxury}40`,
                '&:hover': { bgcolor: `${themeConfig.colors.luxury}20` }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List sx={{ flex: 1 }}>
            {links.map((link, index) => (
              <ListItem 
                key={link.href} 
                disablePadding 
                sx={{ mb: 2 }}
                component={motion.div}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 100 }}
              >
                <ListItemButton 
                  component={Link} 
                  href={link.href} 
                  onClick={() => setOpen(false)}
                  sx={{ 
                    py: 2,
                    px: 3,
                    borderRadius: '12px',
                    border: pathname === link.href ? `1px solid ${themeConfig.colors.luxury}` : '1px solid transparent',
                    bgcolor: pathname === link.href ? `${themeConfig.colors.luxury}10` : 'transparent',
                    '&:hover': { 
                      bgcolor: `${themeConfig.colors.luxury}20`,
                      border: `1px solid ${themeConfig.colors.luxury}40`
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ListItemText 
                    primary={link.label} 
                    primaryTypographyProps={{ 
                      fontSize: '1.4rem', 
                      fontWeight: 600, 
                      color: pathname === link.href ? themeConfig.colors.luxury : themeConfig.colors.white,
                      letterSpacing: '0.02em'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              fullWidth 
              component={Link} 
              href="/contact"
              onClick={() => setOpen(false)}
              sx={{ 
                py: 2.5, 
                borderRadius: '50px',
                background: `linear-gradient(135deg, ${themeConfig.colors.luxury} 0%, ${themeConfig.colors.secondary} 100%)`,
                color: themeConfig.colors.black,
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.08em',
                boxShadow: `0 4px 20px ${themeConfig.colors.luxury}40`,
                '&:hover': {
                  boxShadow: `0 6px 30px ${themeConfig.colors.luxury}60`,
                }
              }}
            >
              GET IN TOUCH
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
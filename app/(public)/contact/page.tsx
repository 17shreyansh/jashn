'use client'

import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert, Container, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import SendIcon from '@mui/icons-material/Send'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { themeConfig } from '@/lib/config/theme'

const MotionBox = motion(Box)

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to submit form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      {/* Hero Section - Dark Premium */}
      <Box sx={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: themeConfig.colors.black,
        position: 'relative',
        overflow: 'hidden',
        pt: '100px'
      }}>
        <Box sx={{ 
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.15), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ textAlign: 'center' }}
          >
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading,
              fontSize: { xs: '3.5rem', md: '5rem' },
              fontWeight: 800,
              color: themeConfig.colors.white,
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>Get In Touch</Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
            <Typography sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              lineHeight: 1.7
            }}>Let's create something extraordinary together</Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Contact Form & Info */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' }, gap: 6 }}>
            {/* Form */}
            <Box>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                sx={{ 
                  p: { xs: 4, md: 6 },
                  bgcolor: 'white',
                  borderRadius: '24px',
                  border: `1px solid ${themeConfig.colors.luxury}20`,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
                }}
              >
                <Typography sx={{ 
                  fontFamily: themeConfig.fonts.heading,
                  fontSize: { xs: '2.25rem', md: '2.75rem' },
                  fontWeight: 700,
                  mb: 5,
                  color: themeConfig.colors.textDark
                }}>Send Us a Message</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField 
                      label="Name" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      required 
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': { borderColor: themeConfig.colors.primary },
                          '&.Mui-focused fieldset': { borderColor: themeConfig.colors.primary }
                        }
                      }}
                    />
                    <TextField 
                      type="email" 
                      label="Email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      required 
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': { borderColor: themeConfig.colors.primary },
                          '&.Mui-focused fieldset': { borderColor: themeConfig.colors.primary }
                        }
                      }}
                    />
                    <TextField 
                      type="tel" 
                      label="Phone (Optional)" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': { borderColor: themeConfig.colors.primary },
                          '&.Mui-focused fieldset': { borderColor: themeConfig.colors.primary }
                        }
                      }}
                    />
                    <TextField 
                      label="Message" 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      multiline 
                      rows={5} 
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': { borderColor: themeConfig.colors.primary },
                          '&.Mui-focused fieldset': { borderColor: themeConfig.colors.primary }
                        }
                      }}
                    />
                    {success && <Alert severity="success" sx={{ borderRadius: '12px' }}>Thank you! We'll get back to you soon.</Alert>}
                    {error && <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>}
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      fullWidth 
                      disabled={loading} 
                      endIcon={<SendIcon />}
                      sx={{
                        py: 2.5,
                        borderRadius: '999px',
                        background: `linear-gradient(135deg, ${themeConfig.colors.luxury}, ${themeConfig.colors.secondary})`,
                        color: themeConfig.colors.black,
                        fontWeight: 800,
                        fontSize: '1.125rem',
                        letterSpacing: '0.05em',
                        boxShadow: `0 8px 24px ${themeConfig.colors.luxury}40`,
                        '&:hover': {
                          boxShadow: `0 12px 32px ${themeConfig.colors.luxury}60`,
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >{loading ? 'Sending...' : 'Send Message'}</Button>
                  </Box>
                </Box>
              </MotionBox>
            </Box>

            {/* Contact Info */}
            <Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <MotionBox
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  sx={{ 
                    p: 5,
                    bgcolor: 'white',
                    borderRadius: '24px',
                    border: `1px solid ${themeConfig.colors.luxury}20`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                  }}
                >
                  <Typography sx={{ 
                    fontFamily: themeConfig.fonts.heading,
                    fontSize: '2rem',
                    fontWeight: 700,
                    mb: 4,
                    color: themeConfig.colors.textDark
                  }}>Contact Information</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                      <Box sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: '12px',
                        bgcolor: `${themeConfig.colors.luxury}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <EmailIcon sx={{ color: themeConfig.colors.luxury, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1rem', color: themeConfig.colors.textLight, mb: 0.5, fontWeight: 600 }}>Email</Typography>
                        <Typography sx={{ fontWeight: 700, color: themeConfig.colors.textDark, fontSize: '1.05rem' }}>jashnplanners786@gmail.com</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                      <Box sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: '12px',
                        bgcolor: `${themeConfig.colors.luxury}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <PhoneIcon sx={{ color: themeConfig.colors.luxury, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1rem', color: themeConfig.colors.textLight, mb: 0.5, fontWeight: 600 }}>Phone</Typography>
                        <Typography sx={{ fontWeight: 700, color: themeConfig.colors.textDark, fontSize: '1.05rem' }}>+91 9027761524</Typography>
                        <Typography sx={{ fontWeight: 700, color: themeConfig.colors.textDark, fontSize: '1.05rem' }}>+91 9368223339</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                      <Box sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: '12px',
                        bgcolor: `${themeConfig.colors.luxury}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <LocationOnIcon sx={{ color: themeConfig.colors.luxury, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1rem', color: themeConfig.colors.textLight, mb: 0.5, fontWeight: 600 }}>Office Address</Typography>
                        <Typography sx={{ fontWeight: 700, color: themeConfig.colors.textDark, fontSize: '1.05rem', lineHeight: 1.6 }}>Opp Mughal Pulia, Near ITC 5 Star Hotel, Fatehabad Road, Agra, UP 282001</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
                      <Box sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: '12px',
                        bgcolor: `${themeConfig.colors.luxury}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <LocationOnIcon sx={{ color: themeConfig.colors.luxury, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '1rem', color: themeConfig.colors.textLight, mb: 0.5, fontWeight: 600 }}>Permanent Address</Typography>
                        <Typography sx={{ fontWeight: 700, color: themeConfig.colors.textDark, fontSize: '1.05rem', lineHeight: 1.6 }}>28/35 Panni Gali, Kashmiri Bazar, Agra, UP 282003</Typography>
                      </Box>
                    </Box>
                  </Box>
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  sx={{ 
                    p: 5,
                    bgcolor: themeConfig.colors.black,
                    borderRadius: '24px',
                    border: `1px solid ${themeConfig.colors.luxury}30`,
                    boxShadow: `0 8px 30px ${themeConfig.colors.luxury}20`
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                    <AccessTimeIcon sx={{ color: themeConfig.colors.luxury, fontSize: 28 }} />
                    <Typography sx={{ 
                      fontFamily: themeConfig.fonts.heading,
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: themeConfig.colors.white
                    }}>Business Hours</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', fontWeight: 600 }}>Monday - Friday</Typography>
                      <Typography sx={{ fontWeight: 700, color: themeConfig.colors.white, fontSize: '1.125rem' }}>9:00 AM - 6:00 PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', fontWeight: 600 }}>Saturday</Typography>
                      <Typography sx={{ fontWeight: 700, color: themeConfig.colors.white, fontSize: '1.125rem' }}>10:00 AM - 4:00 PM</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.125rem', fontWeight: 600 }}>Sunday</Typography>
                      <Typography sx={{ fontWeight: 700, color: themeConfig.colors.luxury, fontSize: '1.125rem' }}>Closed</Typography>
                    </Box>
                  </Box>
                </MotionBox>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

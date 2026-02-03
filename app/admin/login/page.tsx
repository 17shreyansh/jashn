'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Button, Typography, Alert, Container, IconButton, InputAdornment } from '@mui/material'
import { motion } from 'framer-motion'
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

const MotionBox = motion(Box)

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
        setLoading(false)
      } else if (result?.ok) {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left Side - Image/Brand */}
      <Box sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${themeConfig.colors.black}, ${themeConfig.colors.primary}30)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/taj.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }
      }}>
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 4 }}>
          <Typography sx={{
            fontFamily: themeConfig.fonts.heading,
            fontSize: '5rem',
            fontWeight: 700,
            color: themeConfig.colors.white,
            mb: 2,
            letterSpacing: '-0.02em'
          }}>
            Jashn
          </Typography>
          <Typography sx={{
            fontFamily: themeConfig.fonts.heading,
            fontSize: '2rem',
            color: themeConfig.colors.luxury,
            letterSpacing: '0.3em',
            mb: 4
          }}>
            PLANNERS
          </Typography>
          <Box sx={{ width: 60, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 400, mx: 'auto', lineHeight: 1.8 }}>
            Crafting royal celebrations and unforgettable journeys across the globe
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fafafa',
        px: 3
      }}>
        <MotionBox
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ width: '100%', maxWidth: 440 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography sx={{
              fontFamily: themeConfig.fonts.heading,
              fontSize: '2.5rem',
              fontWeight: 700,
              color: themeConfig.colors.textDark,
              mb: 1
            }}>
              Welcome Back
            </Typography>
            <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1rem' }}>
              Sign in to access your admin dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography sx={{ mb: 1, fontWeight: 600, fontSize: '0.875rem', color: themeConfig.colors.textDark }}>Email</Typography>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                disabled={loading}
                placeholder="admin@jashnplanners.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: themeConfig.colors.primary },
                    '&.Mui-focused fieldset': { borderColor: themeConfig.colors.primary, borderWidth: 2 }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 1, fontWeight: 600, fontSize: '0.875rem', color: themeConfig.colors.textDark }}>Password</Typography>
              <TextField
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                disabled={loading}
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" disabled={loading}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    borderRadius: 2,
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: themeConfig.colors.primary },
                    '&.Mui-focused fieldset': { borderColor: themeConfig.colors.primary, borderWidth: 2 }
                  }
                }}
              />
            </Box>

            {error && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
            )}

            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              fullWidth 
              disabled={loading}
              sx={{
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
                bgcolor: themeConfig.colors.black,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: themeConfig.colors.primary,
                  boxShadow: 'none'
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  )
}

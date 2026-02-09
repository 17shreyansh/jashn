'use client'

import { useState } from 'react'
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material'
import { CheckCircle, Error, CloudUpload } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'
import { themeConfig } from '@/lib/config/theme'
import { uploadToCloudinary } from '@/lib/utils/cloudinary-upload'

export default function CloudinaryTestPage() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; url?: string } | null>(null)

  const testCloudinary = async () => {
    setTesting(true)
    setResult(null)

    try {
      const signRes = await fetch('/api/cloudinary/signature', { method: 'POST' })
      
      if (!signRes.ok) {
        const error = await signRes.json()
        setResult({ 
          success: false, 
          message: `Configuration Error: ${error.error}. Please check CLOUDINARY_SETUP.md` 
        })
        return
      }

      const { cloudName, apiKey } = await signRes.json()
      
      if (!cloudName || !apiKey) {
        setResult({ 
          success: false, 
          message: 'Cloudinary credentials missing. Update .env.local and restart server.' 
        })
        return
      }

      setResult({ 
        success: true, 
        message: `✓ Cloudinary configured! Cloud: ${cloudName}. Ready to upload images.` 
      })
    } catch (error: any) {
      setResult({ 
        success: false, 
        message: `Error: ${error.message}. Check console for details.` 
      })
    } finally {
      setTesting(false)
    }
  }

  const testUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setTesting(true)
    setResult(null)

    try {
      const result = await uploadToCloudinary(file, 'test')
      
      if (!result) {
        setResult({ 
          success: false, 
          message: 'Upload failed. Check browser console for details.' 
        })
        return
      }

      setResult({ 
        success: true, 
        message: 'Upload successful! Image uploaded to Cloudinary.',
        url: result.url
      })
    } catch (error: any) {
      setResult({ 
        success: false, 
        message: `Upload error: ${error.message}` 
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 1 }}>
        Cloudinary Test
      </Typography>
      <Typography sx={{ color: themeConfig.colors.textLight, mb: 4 }}>
        Test your Cloudinary configuration
      </Typography>

      <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb', maxWidth: 600 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Step 1: Test Configuration</Typography>
            <Button 
              variant="contained" 
              onClick={testCloudinary} 
              disabled={testing}
              sx={{ bgcolor: themeConfig.colors.black }}
            >
              {testing ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
              Test Connection
            </Button>
          </Box>

          {result && (
            <Alert 
              severity={result.success ? 'success' : 'error'}
              icon={result.success ? <CheckCircle /> : <Error />}
            >
              {result.message}
              {result.url && (
                <Box sx={{ mt: 2 }}>
                  <img src={result.url} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: 8 }} />
                </Box>
              )}
            </Alert>
          )}

          {result?.success && (
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 2 }}>Step 2: Test Upload</Typography>
              <Button 
                variant="contained" 
                component="label"
                disabled={testing}
                startIcon={<CloudUpload />}
                sx={{ bgcolor: themeConfig.colors.primary }}
              >
                {testing ? 'Uploading...' : 'Upload Test Image'}
                <input 
                  type="file" 
                  hidden 
                  accept="image/*" 
                  onChange={testUpload}
                />
              </Button>
            </Box>
          )}

          <Box sx={{ p: 2, bgcolor: '#f9fafb', borderRadius: 2 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>
              Setup Instructions:
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>
              1. Get credentials from cloudinary.com<br />
              2. Update .env.local with your credentials<br />
              3. Restart dev server (npm run dev)<br />
              4. Click "Test Connection" above<br />
              <br />
              See CLOUDINARY_SETUP.md for detailed guide.
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export async function uploadToCloudinary(
  file: File,
  folder: string = 'jashn',
  resourceType: 'image' | 'video' = 'image'
): Promise<{ url: string; publicId: string } | null> {
  try {
    // Get signature from server
    const signRes = await fetch('/api/cloudinary/signature', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ folder })
    })
    
    if (!signRes.ok) {
      const error = await signRes.json()
      throw new Error(error.error || 'Failed to get upload signature')
    }

    const { timestamp, signature, cloudName, apiKey } = await signRes.json()

    console.log('Uploading to:', cloudName, 'with API key:', apiKey)

    // Upload to Cloudinary
    const formData = new FormData()
    formData.append('file', file)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)
    formData.append('api_key', apiKey)
    formData.append('folder', folder)

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      { method: 'POST', body: formData }
    )

    if (!uploadRes.ok) {
      const errorData = await uploadRes.json().catch(() => ({}))
      console.error('Cloudinary response:', uploadRes.status, errorData)
      throw new Error(errorData.error?.message || `Upload failed: ${uploadRes.status} - Check credentials`)
    }

    const data = await uploadRes.json()
    
    return {
      url: data.secure_url,
      publicId: data.public_id
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
}

export async function uploadMultipleToCloudinary(
  files: File[],
  folder: string = 'jashn',
  resourceType: 'image' | 'video' = 'image',
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const urls: string[] = []
  
  for (let i = 0; i < files.length; i++) {
    const result = await uploadToCloudinary(files[i], folder, resourceType)
    if (result) {
      urls.push(result.url)
    }
    if (onProgress) {
      onProgress(i + 1, files.length)
    }
  }
  
  return urls
}

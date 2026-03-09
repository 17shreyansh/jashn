export async function uploadToCloudinary(
  file: File,
  folder: string = 'jashn'
): Promise<string> {
  try {
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

    const formData = new FormData()
    formData.append('file', file)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)
    formData.append('api_key', apiKey)
    formData.append('folder', folder)

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    )

    if (!uploadRes.ok) {
      const errorData = await uploadRes.json().catch(() => ({}))
      throw new Error(errorData.error?.message || 'Upload failed')
    }

    const data = await uploadRes.json()
    return data.secure_url
  } catch (error: any) {
    console.error('Upload error:', error)
    throw new Error(error.message || 'Failed to upload image')
  }
}

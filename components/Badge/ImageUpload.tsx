'use client'

import { useState, useRef } from 'react'

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void
  onCancel: () => void
}

export default function ImageUpload({ onImageSelect, onCancel }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConfirm = () => {
    if (preview) {
      onImageSelect(preview)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-ethmumbai-dark border-2 border-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-2xl font-bold text-white mb-4">Upload Your Picture</h3>
        <p className="text-white/80 mb-4 text-sm">Required for your badge</p>
        
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {preview ? (
            <div className="space-y-4">
              <div className="relative w-full h-48 bg-white/10 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                onClick={() => {
                  setPreview(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                className="text-white/80 hover:text-white text-sm"
              >
                Change Image
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-white/30 rounded-lg text-white/70 hover:text-white hover:border-white/50 transition-colors"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>Click to upload image</p>
                <p className="text-sm mt-1">Max 5MB</p>
              </div>
            </button>
          )}
        </div>

        <div className="flex gap-4">
          {preview ? (
            <button
              onClick={handleConfirm}
              className="w-full bg-white hover:bg-white/90 text-ethmumbai-red font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Continue with This Image
            </button>
          ) : (
            <p className="w-full text-center text-white/70 py-3">
              Please upload an image to continue
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


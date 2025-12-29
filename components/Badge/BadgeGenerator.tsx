'use client'

import { useEffect, useRef, useState } from 'react'
import { generateBadgeImage, downloadBadge } from '@/lib/badgeUtils'

interface BadgeGeneratorProps {
  username: string
  fanLevel: number
  survivalTime: number
  score: number
  userImage?: string
  onBadgeGenerated?: (imageUrl: string) => void
}

export default function BadgeGenerator({ username, fanLevel, survivalTime, score, userImage, onBadgeGenerated }: BadgeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [badgeDataUrl, setBadgeDataUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    const generateBadge = async () => {
      if (!canvasRef.current) return

      try {
        setIsGenerating(true)
        const dataUrl = await generateBadgeImage(
          canvasRef.current,
          username,
          fanLevel,
          survivalTime,
          score,
          userImage
        )
        setBadgeDataUrl(dataUrl)
        onBadgeGenerated?.(dataUrl)
      } catch (error) {
        console.error('Error generating badge:', error)
      } finally {
        setIsGenerating(false)
      }
    }

    generateBadge()
  }, [username, fanLevel, survivalTime, score, userImage])

  const handleDownload = () => {
    if (badgeDataUrl) {
      downloadBadge(badgeDataUrl, `ethmumbai-badge-${username}-${fanLevel}.png`)
    }
  }

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⚙️</div>
          <p className="text-white text-xl">Generating your badge...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Badge Preview */}
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          {badgeDataUrl && (
            <img
              src={badgeDataUrl}
              alt="ETHMumbai Badge"
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="bg-ethmumbai-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
        >
          <span>⬇️</span>
          <span>Download Badge</span>
        </button>
      </div>

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}


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
  const [canvasReady, setCanvasReady] = useState(false)

  // Use callback ref to know when canvas is mounted
  const canvasCallbackRef = (node: HTMLCanvasElement | null) => {
    if (node) {
      canvasRef.current = node
      setCanvasReady(true)
      console.log('BadgeGenerator: Canvas mounted and ready')
    }
  }

  useEffect(() => {
    if (!canvasReady || !canvasRef.current) {
      console.log('BadgeGenerator: Waiting for canvas to be ready...', { canvasReady, hasRef: !!canvasRef.current })
      return
    }

    const generateBadge = async () => {
      console.log('BadgeGenerator: Starting generation', { username, fanLevel, survivalTime, score, hasImage: !!userImage })
      
      if (!canvasRef.current) {
        console.error('BadgeGenerator: Canvas ref is null!')
        setIsGenerating(false)
        return
      }

      try {
        console.log('BadgeGenerator: Setting isGenerating to true')
        setIsGenerating(true)
        console.log('BadgeGenerator: Calling generateBadgeImage...')
        const dataUrl = await generateBadgeImage(
          canvasRef.current,
          username,
          fanLevel,
          survivalTime,
          score,
          userImage
        )
        console.log('BadgeGenerator: Badge generated, dataUrl length:', dataUrl.length)
        setBadgeDataUrl(dataUrl)
        console.log('BadgeGenerator: Badge data URL set, calling onBadgeGenerated callback')
        onBadgeGenerated?.(dataUrl)
        console.log('BadgeGenerator: All done!')
      } catch (error) {
        console.error('BadgeGenerator: Error generating badge:', error)
        setIsGenerating(false)
      } finally {
        console.log('BadgeGenerator: Setting isGenerating to false')
        setIsGenerating(false)
      }
    }

    generateBadge()
  }, [canvasReady, username, fanLevel, survivalTime, score, userImage, onBadgeGenerated])

  const handleDownload = () => {
    if (badgeDataUrl) {
      downloadBadge(badgeDataUrl, `ethmumbai-badge-${username}-${fanLevel}.png`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Hidden canvas for generation - always render it */}
      <canvas 
        ref={canvasCallbackRef} 
        style={{ display: 'none', position: 'absolute' }}
        width={1080}
        height={1920}
      />
      
      {/* Badge Preview */}
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
          {badgeDataUrl ? (
            <img
              src={badgeDataUrl}
              alt="ETHMumbai Badge"
              className="max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-2xl"
            />
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="text-4xl mb-4 animate-spin">⚙️</div>
                <p className="text-white text-xl">Generating your badge...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      {badgeDataUrl && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-ethmumbai-red hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>⬇️</span>
            <span>Download Badge</span>
          </button>
        </div>
      )}
    </div>
  )
}


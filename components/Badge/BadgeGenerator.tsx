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
    <div className="space-y-4">
      {/* Hidden canvas for generation - always render it */}
      <canvas 
        ref={canvasCallbackRef} 
        style={{ display: 'none', position: 'absolute' }}
        width={1080}
        height={1920}
      />
      
      {/* Badge Preview - Compact */}
      <div className="flex justify-center">
        {badgeDataUrl ? (
          <img
            src={badgeDataUrl}
            alt="ETHMumbai Badge"
            className="w-full max-w-[280px] h-auto rounded-xl shadow-lg border-2 border-gray-100"
          />
        ) : (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <div className="text-center">
              <div className="text-4xl mb-3 animate-spin">⚙️</div>
              <p className="text-gray-700 text-lg font-medium">Generating...</p>
            </div>
          </div>
        )}
      </div>

      {/* Download Button - Premium Style */}
      {badgeDataUrl && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="w-full bg-ethmumbai-red hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>⬇️</span>
            <span>Download Badge</span>
          </button>
        </div>
      )}
    </div>
  )
}


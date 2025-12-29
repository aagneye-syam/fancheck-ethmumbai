'use client'

import { useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import PremiumCard from './PremiumCard'
import { downloadBadge } from '@/lib/badgeUtils'

interface BadgeGeneratorProps {
  username: string
  fanLevel: number
  survivalTime: number
  score: number
  userImage?: string
  onBadgeGenerated?: (imageUrl: string) => void
}

export default function BadgeGenerator({ username, fanLevel, survivalTime, score, userImage, onBadgeGenerated }: BadgeGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [badgeDataUrl, setBadgeDataUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Generate badge image from the card component
    const generateBadge = async () => {
      if (!cardRef.current) return

      try {
        setIsGenerating(true)
        
        // Wait a bit for images to load
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
          useCORS: true,
          allowTaint: true
        })
        
        const dataUrl = canvas.toDataURL('image/png')
        setBadgeDataUrl(dataUrl)
        onBadgeGenerated?.(dataUrl)
      } catch (error) {
        console.error('Error generating badge:', error)
      } finally {
        setIsGenerating(false)
      }
    }

    generateBadge()
  }, [username, fanLevel, survivalTime, score, userImage, onBadgeGenerated])

  const handleDownload = () => {
    if (badgeDataUrl) {
      downloadBadge(badgeDataUrl, `ethmumbai-maxi-${username}-${fanLevel}.png`)
    }
  }

  return (
    <div className="space-y-4">
      {/* Card Preview */}
      <div className="flex justify-center">
        <div ref={cardRef}>
          <PremiumCard
            username={username}
            fanLevel={fanLevel}
            score={score}
            survivalTime={survivalTime}
            userImage={userImage}
          />
        </div>
      </div>

      {/* Download Button */}
      {!isGenerating && badgeDataUrl && (
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

      {isGenerating && (
        <div className="text-center">
          <div className="text-sm text-gray-600">Preparing your badge...</div>
        </div>
      )}
    </div>
  )
}


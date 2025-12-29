'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import BadgeGenerator from '@/components/Badge/BadgeGenerator'
import ImageUpload from '@/components/Badge/ImageUpload'
import SocialShare from '@/components/SocialShare'
import Confetti from '@/components/Confetti'

export default function BadgePage() {
  const router = useRouter()
  const { username, fanLevel, survivalTime, userImage: storedImage, setUserImage } = useAppStore()
  const [showImageUpload, setShowImageUpload] = useState(true)
  const [userImage, setLocalUserImage] = useState<string | undefined>(storedImage || undefined)
  const [badgeImageUrl, setBadgeImageUrl] = useState<string>('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [imageUploadDecided, setImageUploadDecided] = useState(false)
  
  // Calculate score from fan level (reverse calculation)
  const score = fanLevel ? fanLevel / 10 : 0

  useEffect(() => {
    // Redirect if no username or fan level
    if (!username || fanLevel === null) {
      router.push('/play')
      return
    }
  }, [username, fanLevel, router])

  const handleImageSelect = (imageUrl: string) => {
    setLocalUserImage(imageUrl)
    setUserImage(imageUrl)
    setShowImageUpload(false)
    setImageUploadDecided(true)
  }

  const handleSkipImage = () => {
    setShowImageUpload(false)
    setImageUploadDecided(true)
  }

  // Update badge image URL when badge is generated
  const handleBadgeGenerated = (dataUrl: string) => {
    setBadgeImageUrl(dataUrl)
    setShowConfetti(true)
  }

  if (!username || fanLevel === null) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-ethmumbai-dark via-ethmumbai-blue to-ethmumbai-red flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-ethmumbai-dark via-ethmumbai-blue to-ethmumbai-red p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
            Your ETHMumbai Badge
          </h1>
          <p className="text-base md:text-xl text-white/90">
            @{username} • Fan Level: <span className="text-ethmumbai-red font-bold">{fanLevel}</span>
          </p>
        </div>

        {/* Badge Generator - Only show after image upload decision */}
        {imageUploadDecided && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-8 border border-white/20 mb-4 md:mb-8">
            <BadgeGenerator
              username={username}
              fanLevel={fanLevel}
              survivalTime={survivalTime || 0}
              score={score}
              userImage={userImage}
              onBadgeGenerated={handleBadgeGenerated}
            />
          </div>
        )}

        {/* Social Share */}
        {badgeImageUrl && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-8 border border-white/20">
            <SocialShare
              badgeImageUrl={badgeImageUrl}
              username={username}
              fanLevel={fanLevel}
            />
          </div>
        )}

        {/* Play Again Button */}
        <div className="text-center mt-6 md:mt-8">
          <button
            onClick={() => {
              useAppStore.getState().reset()
              router.push('/play')
            }}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 md:px-8 rounded-lg transition-colors border border-white/20 text-sm md:text-base"
          >
            Play Again
          </button>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <ImageUpload
          onImageSelect={handleImageSelect}
          onCancel={handleSkipImage}
        />
      )}

      {/* Confetti Effect */}
      {showConfetti && <Confetti />}
    </main>
  )
}


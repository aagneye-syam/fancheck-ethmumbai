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
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Premium Header with Red Accent */}
        <div className="text-center mb-6">
          <div className="inline-block">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Your ETHMumbai Badge
            </h1>
            <div className="h-1 bg-gradient-to-r from-ethmumbai-red via-yellow-400 to-ethmumbai-red rounded-full"></div>
          </div>
          <p className="text-base md:text-lg text-gray-700 mt-3">
            @{username} • <span className="text-ethmumbai-red font-bold">Fan Level: {fanLevel}</span>
          </p>
        </div>

        {/* Main Content Grid - Side by Side Layout */}
        {imageUploadDecided && (
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Left: Badge Preview */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
              <BadgeGenerator
                username={username}
                fanLevel={fanLevel}
                survivalTime={survivalTime || 0}
                score={score}
                userImage={userImage}
                onBadgeGenerated={handleBadgeGenerated}
              />
            </div>

            {/* Right: Share Options */}
            {badgeImageUrl && (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6">
                <SocialShare
                  badgeImageUrl={badgeImageUrl}
                  username={username}
                  fanLevel={fanLevel}
                />
                
                {/* Play Again Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      useAppStore.getState().reset()
                      router.push('/play')
                    }}
                    className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all border border-gray-300"
                  >
                    🎮 Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
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


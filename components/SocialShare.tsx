'use client'

interface SocialShareProps {
  badgeImageUrl: string
  username: string
  fanLevel: number
}

export default function SocialShare({ badgeImageUrl, username, fanLevel }: SocialShareProps) {
  const shareText = `I'm a ${fanLevel}/100 ETHMumbai Maxi! Check your fan level at ETHMumbai Maxi Checker! 🔥 @${username}`
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const downloadAndShareImage = async () => {
    // Download the badge image for sharing
    const link = document.createElement('a')
    link.download = `ethmumbai-badge-${username}.png`
    link.href = badgeImageUrl
    link.click()
  }

  const shareToTwitter = () => {
    downloadAndShareImage()
    setTimeout(() => {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
      window.open(twitterUrl, '_blank', 'width=550,height=420')
    }, 500)
  }

  const shareToLinkedIn = () => {
    downloadAndShareImage()
    setTimeout(() => {
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
      window.open(linkedInUrl, '_blank', 'width=550,height=420')
    }, 500)
  }

  const shareToFacebook = () => {
    downloadAndShareImage()
    setTimeout(() => {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
      window.open(facebookUrl, '_blank', 'width=550,height=420')
    }, 500)
  }

  const shareToWhatsApp = () => {
    downloadAndShareImage()
    setTimeout(() => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
      window.open(whatsappUrl, '_blank')
    }, 500)
  }

  const shareToInstagram = () => {
    downloadAndShareImage()
    setTimeout(() => {
      alert('Badge downloaded! 📸\n\nTo share on Instagram Story:\n1. Open Instagram app\n2. Create a new Story\n3. Upload the downloaded badge image\n4. Tag @ethmumbai!\n\nThe image is in your Downloads folder.')
    }, 500)
  }

  const useWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ETHMumbai Maxi Checker',
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled')
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
          Share Your Badge
        </h3>
        <div className="h-1 w-16 bg-gradient-to-r from-ethmumbai-red to-yellow-400 rounded-full mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={shareToTwitter}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all border-2 border-gray-200 hover:border-ethmumbai-red flex flex-col items-center gap-2 shadow-sm hover:shadow-md"
        >
          <span className="text-2xl">🐦</span>
          <span className="text-sm">Twitter/X</span>
        </button>

        <button
          onClick={shareToLinkedIn}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all border-2 border-gray-200 hover:border-ethmumbai-red flex flex-col items-center gap-2 shadow-sm hover:shadow-md"
        >
          <span className="text-2xl">💼</span>
          <span className="text-sm">LinkedIn</span>
        </button>
      </div>
    </div>
  )
}


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
      <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-4 md:mb-6">
        Share Your Badge
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <button
          onClick={shareToTwitter}
          className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors flex flex-col items-center gap-1 md:gap-2 text-sm md:text-base"
        >
          <span className="text-xl md:text-2xl">🐦</span>
          <span>Twitter/X</span>
        </button>

        <button
          onClick={shareToLinkedIn}
          className="bg-white hover:bg-white/90 text-ethmumbai-red font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors flex flex-col items-center gap-1 md:gap-2 text-sm md:text-base border-2 border-white"
        >
          <span className="text-xl md:text-2xl">💼</span>
          <span>LinkedIn</span>
        </button>

        <button
          onClick={shareToFacebook}
          className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors flex flex-col items-center gap-1 md:gap-2 text-sm md:text-base"
        >
          <span className="text-xl md:text-2xl">📘</span>
          <span>Facebook</span>
        </button>

        <button
          onClick={shareToWhatsApp}
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors flex flex-col items-center gap-1 md:gap-2 text-sm md:text-base"
        >
          <span className="text-xl md:text-2xl">💬</span>
          <span>WhatsApp</span>
        </button>

        <button
          onClick={shareToInstagram}
          className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-opacity flex flex-col items-center gap-1 md:gap-2 text-sm md:text-base"
        >
          <span className="text-xl md:text-2xl">📷</span>
          <span>Instagram</span>
        </button>

        {navigator.share && (
          <button
            onClick={useWebShare}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors flex flex-col items-center gap-1 md:gap-2 border border-white/20 text-sm md:text-base"
          >
            <span className="text-xl md:text-2xl">📤</span>
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  )
}


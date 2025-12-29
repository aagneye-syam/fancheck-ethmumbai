'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UsernameInput from '@/components/UsernameInput'
import FlappyBird from '@/components/Game/FlappyBird'
import { useAppStore } from '@/lib/store'

export default function PlayPage() {
  const router = useRouter()
  const { username, setUsername, clearFanLevel } = useAppStore()
  const [localUsername, setLocalUsername] = useState<string | null>(null)
  const [gameUnlocked, setGameUnlocked] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [fanLevel, setFanLevel] = useState<number | null>(null)
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    // Clear fan level on page load to restart game
    clearFanLevel()
    // Generate new key to force component remount
    setGameKey(Date.now())
  }, [clearFanLevel])

  useEffect(() => {
    // Check if username exists in store
    if (username) {
      setLocalUsername(username)
      setGameUnlocked(true)
    }
  }, [username])

  const handleUsernameSubmit = (username: string) => {
    setLocalUsername(username)
    setGameUnlocked(true)
  }

  const handleGameOver = (level: number) => {
    setGameCompleted(true)
    setFanLevel(level)
    
    // Redirect to badge page after a short delay
    setTimeout(() => {
      router.push('/badge')
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-ethmumbai-dark via-ethmumbai-blue to-ethmumbai-red p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4">
            ETHMumbai Maxi Checker
          </h1>
          {localUsername && (
            <p className="text-lg md:text-xl text-white/90">
              Welcome, @{localUsername}!
            </p>
          )}
        </div>

        {/* Username Input Section */}
        {!gameUnlocked && (
          <div className="mb-6 md:mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-8 border border-white/20">
              <UsernameInput onUsernameSubmit={handleUsernameSubmit} />
            </div>
          </div>
        )}

        {/* Locked Game Section */}
        {!gameUnlocked && (
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 md:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
              <div className="text-center px-4">
                <div className="text-4xl md:text-6xl mb-4">🔒</div>
                <p className="text-lg md:text-2xl text-white font-bold">
                  Enter your username to unlock the game
                </p>
              </div>
            </div>
            <div className="opacity-30">
              <div className="w-full h-64 md:h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-white/50">Game Locked</p>
              </div>
            </div>
          </div>
        )}

        {/* Unlocked Game Section */}
        {gameUnlocked && !gameCompleted && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-8 border border-white/20">
            <FlappyBird key={gameKey} onGameOver={handleGameOver} />
          </div>
        )}

        {/* Game Completed Section */}
        {gameCompleted && fanLevel !== null && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 md:p-8 border border-white/20 text-center">
            <div className="text-4xl md:text-6xl mb-4">🎉</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Game Over!
            </h2>
            <p className="text-xl md:text-2xl text-white mb-2">
              Your Fan Level: <span className="text-ethmumbai-red font-bold">{fanLevel}</span>
            </p>
            <p className="text-sm md:text-base text-white/80">
              Redirecting to badge generation...
            </p>
          </div>
        )}
      </div>
    </main>
  )
}


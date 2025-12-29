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
  const [gameLost, setGameLost] = useState(false)
  const [fanLevel, setFanLevel] = useState<number | null>(null)
  const [gameKey, setGameKey] = useState(0)
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)

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

  const handleGameOver = (level: number, completed: boolean) => {
    // Prevent multiple calls
    if (gameLost || gameCompleted) return
    
    setFanLevel(level)
    if (completed) {
      setGameCompleted(true)
      setShowCompletionPopup(true)
    } else {
      setGameLost(true)
    }
  }

  const handleMakeCard = () => {
    router.push('/badge')
  }

  const handleRestartGame = () => {
    setGameLost(false)
    setGameCompleted(false)
    setFanLevel(null)
    setShowCompletionPopup(false)
    clearFanLevel()
    setGameKey(Date.now())
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
        {gameUnlocked && !gameCompleted && !gameLost && (
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-8 border border-white/20">
            <FlappyBird key={gameKey} onGameOver={handleGameOver} />
          </div>
        )}

        {/* Completion Popup */}
        {showCompletionPopup && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-ethmumbai-blue to-ethmumbai-red rounded-lg p-8 md:p-12 max-w-md w-full border-4 border-white/30 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="text-6xl md:text-8xl mb-4">🏆</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Congratulations! 🎉
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-4">
                  You scored 10/10!
                </p>
                <p className="text-lg text-white/80 mb-6">
                  Make the card and show off your ETHMumbai Maxi status!
                </p>
                <button
                  onClick={handleMakeCard}
                  className="w-full bg-white hover:bg-white/90 text-ethmumbai-red font-bold text-xl py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Make the Card 🎴
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Popup */}
        {gameLost && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-ethmumbai-dark via-ethmumbai-red to-ethmumbai-blue rounded-lg p-8 md:p-12 max-w-md w-full border-4 border-white/30 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="text-6xl md:text-8xl mb-4">💥</div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Game Over! 😢
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-2">
                  Your Fan Level: <span className="text-ethmumbai-red font-bold">{fanLevel}</span>
                </p>
                <p className="text-lg text-white/80 mb-6">
                  Don't give up! Try again or save your progress!
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleMakeCard}
                    className="flex-1 bg-ethmumbai-blue hover:bg-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Print Card 🎴
                  </button>
                  <button
                    onClick={handleRestartGame}
                    className="flex-1 bg-ethmumbai-red hover:bg-red-600 text-white font-bold text-lg py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Restart Game 🔄
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


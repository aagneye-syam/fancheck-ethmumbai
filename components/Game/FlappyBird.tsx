'use client'

import { useEffect, useRef, useState } from 'react'
import {
  GameState,
  createInitialState,
  updateGame,
  jump,
  calculateFanLevel,
  BIRD_SIZE,
  PIPE_WIDTH,
  PIPE_GAP,
} from '@/lib/gameEngine'
import { useAppStore } from '@/lib/store'

interface FlappyBirdProps {
  onGameOver: (fanLevel: number, completed: boolean, survivalTime: number) => void
}

export default function FlappyBird({ onGameOver }: FlappyBirdProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const [gameState, setGameState] = useState<GameState | null>(null)
  const gameStateRef = useRef<GameState | null>(null)
  const birdImageRef = useRef<HTMLImageElement | null>(null)
  const gameOverCalledRef = useRef(false)

  // Keep ref in sync with state
  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

  // Load bird image
  useEffect(() => {
    const img = new Image()
    img.src = '/assets/flappy-bird.png'
    img.onload = () => {
      birdImageRef.current = img
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    const initialState = createInitialState(canvas.height)
    setGameState(initialState)

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        const currentState = gameStateRef.current
        if (currentState) {
          setGameState(jump(currentState))
        }
      }
    }

    const handleClick = () => {
      const currentState = gameStateRef.current
      if (currentState) {
        setGameState(jump(currentState))
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    canvas.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (!gameState || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gameLoop = () => {
      console.log('Game loop running, gameState:', { gameOver: gameState.gameOver, score: gameState.score, gameOverCalled: gameOverCalledRef.current })
      
      if (gameState.gameOver && !gameOverCalledRef.current) {
        console.log('Game over detected! Calling onGameOver callback')
        gameOverCalledRef.current = true
        const fanLevel = calculateFanLevel(gameState.score)
        console.log('Calculated fan level:', fanLevel, 'Survival time:', gameState.survivalTime)
        useAppStore.getState().setFanLevel(fanLevel)
        useAppStore.getState().setSurvivalTime(gameState.survivalTime)
        onGameOver(fanLevel, false, gameState.survivalTime) // false = lost
        console.log('onGameOver callback called')
        return
      }

      const newState = updateGame(gameState, canvas.width, canvas.height)
      console.log('Updated game state:', { gameOver: newState.gameOver, score: newState.score })
      
      // Check for completion (score >= 10)
      if (newState.score >= 10 && !newState.gameOver && !gameOverCalledRef.current) {
        console.log('Completion detected!')
        gameOverCalledRef.current = true
        const fanLevel = calculateFanLevel(newState.score)
        const survivalTime = Math.floor((Date.now() - newState.startTime) / 1000)
        useAppStore.getState().setFanLevel(fanLevel)
        useAppStore.getState().setSurvivalTime(survivalTime)
        onGameOver(fanLevel, true, survivalTime) // true = completed
        return
      }
      
      // Check if game just ended
      if (newState.gameOver && !gameState.gameOver && !gameOverCalledRef.current) {
        console.log('Game just ended! New collision detected')
        gameOverCalledRef.current = true
        const fanLevel = calculateFanLevel(newState.score)
        console.log('Calculated fan level:', fanLevel, 'Survival time:', newState.survivalTime)
        useAppStore.getState().setFanLevel(fanLevel)
        useAppStore.getState().setSurvivalTime(newState.survivalTime)
        onGameOver(fanLevel, false, newState.survivalTime)
        console.log('onGameOver callback called from new collision')
        return
      }
      
      setGameState(newState)

      // Draw
      ctx.fillStyle = '#87CEEB'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Ground
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50)
      ctx.fillStyle = '#228B22'
      ctx.fillRect(0, canvas.height - 50, canvas.width, 10)

      // Pipes
      ctx.fillStyle = '#228B22'
      for (const pipe of newState.pipes) {
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY)
        // Bottom pipe
        ctx.fillRect(
          pipe.x,
          pipe.gapY + PIPE_GAP,
          PIPE_WIDTH,
          canvas.height - (pipe.gapY + PIPE_GAP)
        )
      }

      // Bird
      if (birdImageRef.current) {
        // Draw bird image
        ctx.drawImage(
          birdImageRef.current,
          100 - BIRD_SIZE / 2,
          newState.birdY,
          BIRD_SIZE,
          BIRD_SIZE
        )
      } else {
        // Fallback to circle if image not loaded
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(100, newState.birdY + BIRD_SIZE / 2, BIRD_SIZE / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Score (display with 1 decimal place, max 10)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'left'
      const displayScore = Math.min(10, newState.score).toFixed(1)
      ctx.fillText(`Score: ${displayScore}/10`, 20, 40)

      if (!newState.gameOver && newState.gameStarted) {
        animationFrameRef.current = requestAnimationFrame(gameLoop)
      }
    }

    if (gameState.gameStarted && !gameState.gameOver) {
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    } else if (!gameState.gameStarted) {
      // Draw start screen
      ctx.fillStyle = '#87CEEB'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 48px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Click or Press Space', canvas.width / 2, canvas.height / 2)
      ctx.font = '24px Arial'
      ctx.fillText('to Start!', canvas.width / 2, canvas.height / 2 + 50)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, onGameOver])

  const handleMobileJump = () => {
    const currentState = gameStateRef.current
    if (currentState) {
      setGameState(jump(currentState))
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="border-4 border-white rounded-lg bg-sky-300 w-full max-w-[800px]"
        style={{ height: 'auto', aspectRatio: '4/3' }}
      />
      
      {/* Desktop Instructions */}
      <p className="hidden md:block text-white/80 text-sm">
        Click or press Space to flap
      </p>
      
      {/* Mobile Jump Button */}
      <button
        onClick={handleMobileJump}
        className="md:hidden bg-ethmumbai-red hover:bg-red-600 active:bg-red-700 text-white font-bold text-xl px-12 py-6 rounded-lg shadow-lg transition-all active:scale-95 touch-manipulation"
      >
        TAP TO JUMP 🚀
      </button>
      
      {/* Mobile Instructions */}
      <p className="md:hidden text-white/80 text-sm text-center">
        Tap the button or the game to flap
      </p>
    </div>
  )
}


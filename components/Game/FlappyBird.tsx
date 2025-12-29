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
  onGameOver: (fanLevel: number) => void
}

export default function FlappyBird({ onGameOver }: FlappyBirdProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const [gameState, setGameState] = useState<GameState | null>(null)
  const gameStateRef = useRef<GameState | null>(null)

  // Keep ref in sync with state
  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

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
      if (gameState.gameOver) {
        const fanLevel = calculateFanLevel(gameState.score)
        useAppStore.getState().setFanLevel(fanLevel)
        onGameOver(fanLevel)
        return
      }

      const newState = updateGame(gameState, canvas.width, canvas.height)
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
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(100, newState.birdY + BIRD_SIZE / 2, BIRD_SIZE / 2, 0, Math.PI * 2)
      ctx.fill()

      // Score
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'left'
      ctx.fillText(`Score: ${newState.score}`, 20, 40)

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

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border-4 border-ethmumbai-blue rounded-lg bg-sky-300"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <p className="mt-4 text-white/80 text-sm">
        Click or press Space to flap
      </p>
    </div>
  )
}


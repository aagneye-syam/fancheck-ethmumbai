'use client'

import { useEffect, useState } from 'react'

export default function Confetti() {
  const [confettiElements, setConfettiElements] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Create confetti elements
    const elements = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
    setConfettiElements(elements)

    // Clean up after animation
    const timer = setTimeout(() => {
      setConfettiElements([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (confettiElements.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiElements.map((confetti) => (
        <div
          key={confetti.id}
          className="confetti"
          style={{
            left: `${confetti.left}%`,
            animationDelay: `${confetti.delay}s`,
            animationDuration: `${confetti.duration}s`,
          }}
        />
      ))}
    </div>
  )
}


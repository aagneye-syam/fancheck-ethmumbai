'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'

interface UsernameInputProps {
  onUsernameSubmit: (username: string) => void
}

export default function UsernameInput({ onUsernameSubmit }: UsernameInputProps) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      setError('Please enter your Twitter username')
      return
    }

    // Remove @ if present
    const cleanUsername = trimmedUsername.replace('@', '')
    
    if (cleanUsername.length < 1) {
      setError('Please enter a valid username')
      return
    }

    setError('')
    useAppStore.getState().setUsername(cleanUsername)
    onUsernameSubmit(cleanUsername)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-white text-lg mb-2">
            Enter your Twitter/X username
          </label>
          <div className="flex gap-2">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder="@username"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white hover:bg-white/90 text-ethmumbai-red font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Submit
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </form>
    </div>
  )
}


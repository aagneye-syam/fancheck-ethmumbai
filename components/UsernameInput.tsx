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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-900 text-lg font-semibold mb-3 text-center">
            Enter your Twitter/X username
          </label>
          <div className="flex gap-3">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError('')
              }}
              placeholder="@username"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ethmumbai-red focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-ethmumbai-red hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
          {error && <p className="text-ethmumbai-red text-sm mt-2 text-center font-medium">{error}</p>}
        </div>
      </form>
    </div>
  )
}


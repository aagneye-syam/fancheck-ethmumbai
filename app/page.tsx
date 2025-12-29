'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ethmumbai-dark via-ethmumbai-blue to-ethmumbai-red p-8">
      <div className="text-center space-y-8 max-w-4xl">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-block bg-ethmumbai-blue p-4 rounded-lg transform rotate-45 mb-4">
            <span className="text-white font-bold text-xl transform -rotate-45 block">ETHMUMBAI</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          ETHMumbai Maxi Checker
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Create a website that checks how big of an ETHMumbai fan you are.
        </p>
        <p className="text-lg text-white/80 mb-12">
          Play the game and flex your maxi card!
        </p>

        {/* CTA Button */}
        <Link
          href="/play"
          className="inline-block bg-ethmumbai-red hover:bg-red-600 text-white font-bold text-xl px-12 py-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Start Playing 🔥
        </Link>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-4 text-4xl">
          <span>🏆</span>
          <span>🎮</span>
          <span>🚀</span>
        </div>
      </div>
    </main>
  )
}


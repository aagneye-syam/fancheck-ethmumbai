'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ethmumbai-dark via-ethmumbai-blue to-ethmumbai-red p-4 md:p-8">
      <div className="text-center space-y-8 max-w-4xl w-full px-4">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/assets/ethmumbai-logo.svg"
            alt="ETHMumbai Logo"
            width={200}
            height={80}
            className="w-48 md:w-64 h-auto"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4">
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
          className="inline-block bg-ethmumbai-red hover:bg-red-600 text-white font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
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


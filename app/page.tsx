'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4 md:p-8 relative overflow-hidden">
      {/* Red accent gradient in corner */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-ethmumbai-red to-red-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-yellow-400 to-yellow-200 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="text-center space-y-8 max-w-4xl w-full px-4 relative z-10">
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
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
          ETHMumbai Maxi Checker
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Create a website that checks how big of an ETHMumbai fan you are.
        </p>
        <p className="text-lg text-gray-600 mb-12">
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


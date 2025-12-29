'use client'

import React from 'react'

interface PremiumCardProps {
  username: string
  fanLevel: number
  score: number
  survivalTime: number
  userImage?: string
}

const PremiumCard: React.FC<PremiumCardProps> = ({ username, fanLevel, score, survivalTime, userImage }) => {
  const progressPercentage = fanLevel
  const formattedScore = score.toFixed(1)
  const formattedTime = `00:00:${survivalTime.toString().padStart(2, '0')}`
  const fanId = `2024-EM-${fanLevel >= 100 ? 'LEGEND' : fanLevel >= 50 ? 'MAXI' : 'FAN'}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  const edition = fanLevel >= 100 ? 'LEGEND EDITION' : fanLevel >= 50 ? 'MAXI EDITION' : 'FAN EDITION'

  return (
    <div className="relative w-[380px] h-[660px] md:w-[420px] md:h-[720px] rounded-[40px] p-1 bg-[#d4af37] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Outer Golden Border Effect */}
      <div className="absolute inset-0 border-[12px] border-double border-[#9c7b16] rounded-[40px] pointer-events-none z-10 shadow-inner"></div>
      
      {/* Diamond Corner Accents */}
      <div className="absolute top-4 left-4 w-6 h-6 bg-white rotate-45 z-20 flex items-center justify-center shadow-[0_0_10px_white]">
        <div className="w-4 h-4 bg-slate-100 border border-slate-300"></div>
      </div>
      <div className="absolute top-4 right-4 w-6 h-6 bg-white rotate-45 z-20 flex items-center justify-center shadow-[0_0_10px_white]">
        <div className="w-4 h-4 bg-slate-100 border border-slate-300"></div>
      </div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-white rotate-45 z-20 flex items-center justify-center shadow-[0_0_10px_white]">
        <div className="w-4 h-4 bg-slate-100 border border-slate-300"></div>
      </div>
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rotate-45 z-20 flex items-center justify-center shadow-[0_0_10px_white]">
        <div className="w-4 h-4 bg-slate-100 border border-slate-300"></div>
      </div>

      {/* Main Card Content */}
      <div className="w-full h-full bg-gradient-to-b from-[#4d0714] via-[#6e0b1c] to-[#2d040b] rounded-[38px] flex flex-col items-center pt-8 px-6 overflow-hidden relative">
        
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8 z-20">
          <img src="/assets/ethmumbai-logo.svg" alt="ETHMumbai" className="h-12 w-auto" />
        </div>

        {/* Title Section */}
        <div className="text-center z-20 mb-4">
          <h2 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-tight">
            ETHMumbai
          </h2>
          <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-700 drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] leading-none uppercase">
            MAXI
          </h1>
        </div>

        {/* Central Graphic */}
        <div className="relative w-full flex flex-col items-center justify-center my-4 z-20">
          {/* Ethereum Trophy - Static */}
          <div className="mb-[-20px] z-10">
            <svg className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" viewBox="0 0 784.37 1277.39" fill="currentColor">
              <path d="M392.07,0l-8.22,28.01V868.58l8.22,8.22,392.3-231.86L392.07,0Z"/>
              <path d="M392.07,0L0,644.94l392.07,231.86V0Z"/>
              <path d="M392.07,953.52l-4.63,5.65v307.3l4.63,10.93,392.59-553.33L392.07,953.52Z"/>
              <path d="M392.07,1277.39V953.52L0,724.08l392.07,553.31Z"/>
              <path d="M392.07,868.58l392.3-231.86L392.07,458.75V868.58Z"/>
              <path d="M0,644.94l392.07,223.64V458.75L0,644.94Z"/>
            </svg>
          </div>

          {/* Profile Container */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center overflow-hidden">
              {userImage ? (
                <img src={userImage} alt="Avatar" className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-600 flex items-center justify-center text-white text-3xl font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Username Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-lg whitespace-nowrap">
              <span className="text-black font-bold text-sm">@{username}</span>
            </div>
          </div>
        </div>

        {/* Stats Panel (Glassmorphism) */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mt-8 space-y-4 z-20">
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Fan Level</span>
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Maxi Level ({fanLevel}/100)</span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-amber-500 shadow-[0_0_10px_rgba(250,204,21,1)] transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            {/* Draggable-like Handle UI */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_white] transition-all duration-1000 z-10"
              style={{ left: `calc(${progressPercentage}% - 8px)` }}
            ></div>
          </div>

          <div className="flex justify-center items-center text-white text-xs font-bold pt-1">
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-[10px] uppercase">Final Score</span>
              <span className="text-2xl tracking-tight text-yellow-400">{formattedScore}/10</span>
            </div>
          </div>

          {/* AI Message */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-[10px] text-white/50 italic text-center line-clamp-2">
              "The journey of a thousand blocks starts with a single hash."
            </p>
          </div>
        </div>

        {/* Footer Badge */}
        <div className="mt-6 z-20">
          <div className="bg-gradient-to-r from-[#8c671b] via-[#d4af37] to-[#8c671b] px-10 py-2 rounded-lg border-2 border-[#5c430e] shadow-xl">
             <span className="text-black font-bold text-lg tracking-tighter italic">
               {edition}
             </span>
          </div>
        </div>

        {/* Final Info Text */}
        <div className="mt-4 mb-4 text-white/40 font-mono text-[10px] tracking-widest z-20">
          FAN-ID: {fanId}
        </div>

      </div>

      {/* Gloss Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[40px] opacity-20 bg-gradient-to-tr from-white via-transparent to-transparent z-30"></div>
    </div>
  )
}

export default PremiumCard


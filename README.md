# ETHMumbai Maxi Checker

A Next.js application that allows users to check how big of an ETHMumbai fan they are by playing a Flappy Bird game and generating a shareable badge.

## Features

- 🎮 Interactive Flappy Bird game
- 🏆 Fan level scoring (0-100)
- 🎨 Custom badge generation with optional image upload
- 📱 Social media sharing (Twitter, LinkedIn, Facebook, WhatsApp, Instagram)
- 🎉 Confetti celebration effects
- 🎨 ETHMumbai branded design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Project Structure

```
ethmumbai/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── play/              # Game page
│   └── badge/             # Badge generation page
├── components/            # React components
│   ├── Game/              # Game components
│   ├── Badge/             # Badge components
│   └── SocialShare.tsx    # Social sharing
├── lib/                   # Utilities
│   ├── gameEngine.ts      # Game logic
│   ├── badgeUtils.ts      # Badge generation
│   └── store.ts           # State management
└── public/                # Static assets
```

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- HTML5 Canvas (game)
- html2canvas (badge generation)

## License

MIT


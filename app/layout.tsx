import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ETHMumbai Maxi Checker',
  description: 'Check how big of an ETHMumbai fan you are!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


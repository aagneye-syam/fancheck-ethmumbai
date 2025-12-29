// Helper function to draw rounded rectangle
const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export const generateBadgeImage = async (
  canvas: HTMLCanvasElement,
  username: string,
  fanLevel: number,
  survivalTime: number,
  score: number,
  userImage?: string
): Promise<string> => {
  console.log('Starting badge generation:', { username, fanLevel, survivalTime, score, hasImage: !!userImage })
  
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  const width = 1080
  const height = 1920
  canvas.width = width
  canvas.height = height
  
  console.log('Canvas size set:', { width, height })

  // Premium gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, '#0a0a0a')
  gradient.addColorStop(0.3, '#1a1a3e')
  gradient.addColorStop(0.7, '#0066FF')
  gradient.addColorStop(1, '#FF0000')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Add subtle pattern overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
  for (let i = 0; i < 50; i++) {
    ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2)
  }

  // Header section
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
  ctx.fillRect(0, 0, width, 300)

  // ETHMumbai logo
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 72px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('ETHMUMBAI', width / 2, 120)

  // Subtitle
  ctx.fillStyle = '#FFD700'
  ctx.font = '36px Arial'
  ctx.fillText('Maxi Checker', width / 2, 180)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '24px Arial'
  ctx.fillText('OFFICIAL', width / 2, 240)

  // Main card section
  const cardY = 350
  const cardHeight = 1100
  
  // Card background with premium border
  ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 8
  drawRoundedRect(ctx, 80, cardY, width - 160, cardHeight, 30)
  ctx.fill()
  ctx.stroke()

  // Inner glow effect
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)'
  ctx.lineWidth = 20
  drawRoundedRect(ctx, 80, cardY, width - 160, cardHeight, 30)
  ctx.stroke()

  // User image (centered and large)
  if (userImage) {
    console.log('Loading user image...')
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('User image loaded successfully')
          resolve(null)
        }
        img.onerror = (err) => {
          console.error('Error loading user image:', err)
          reject(err)
        }
        img.src = userImage
      })

      const imgSize = 280
      const imgX = width / 2 - imgSize / 2
      const imgY = cardY + 100

      // Glow effect around image
      ctx.shadowColor = '#0066FF'
      ctx.shadowBlur = 30
      ctx.save()
      ctx.beginPath()
      ctx.arc(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2)
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 6
      ctx.stroke()
      ctx.clip()
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize)
      ctx.restore()
      ctx.shadowBlur = 0
    } catch (error) {
      console.error('Failed to load user image, continuing without it:', error)
    }
  } else {
    console.log('No user image provided')
  }

  // Username
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 56px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`@${username}`, width / 2, cardY + 480)

  // Badge title
  ctx.fillStyle = '#FFD700'
  ctx.font = '32px Arial'
  ctx.fillText('TOP 10% PLAYER', width / 2, cardY + 570)

  // Fan Level section
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '32px Arial'
  ctx.fillText('ETHMumbai Stan', width / 2, cardY + 650)

  ctx.font = '24px Arial'
  ctx.fillStyle = '#AAAAAA'
  ctx.fillText('A symbol of excellence.', width / 2, cardY + 690)

  // Stats section with boxes
  const statsY = cardY + 780
  const boxWidth = 400
  const boxHeight = 140
  const boxX = width / 2 - boxWidth / 2

  // Score box
  ctx.fillStyle = 'rgba(255, 215, 0, 0.1)'
  ctx.strokeStyle = '#FFD700'
  ctx.lineWidth = 2
  drawRoundedRect(ctx, boxX, statsY, boxWidth, boxHeight, 15)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#FFD700'
  ctx.font = 'bold 64px Arial'
  ctx.fillText(`${score.toFixed(1)}`, width / 2, statsY + 70)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '24px Arial'
  ctx.fillText('FINAL SCORE', width / 2, statsY + 110)

  // Survival time box
  const timeBoxY = statsY + 180
  ctx.fillStyle = 'rgba(0, 102, 255, 0.1)'
  ctx.strokeStyle = '#0066FF'
  ctx.lineWidth = 2
  drawRoundedRect(ctx, boxX, timeBoxY, boxWidth, boxHeight, 15)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#0066FF'
  ctx.font = 'bold 64px Arial'
  ctx.fillText(`${survivalTime}s`, width / 2, timeBoxY + 70)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '24px Arial'
  ctx.fillText('SURVIVAL TIME', width / 2, timeBoxY + 110)

  // Footer
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.fillRect(0, height - 220, width, 220)

  ctx.fillStyle = '#FFFFFF'
  ctx.font = '28px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Fan Level Achievement', width / 2, height - 140)

  ctx.fillStyle = '#FFD700'
  ctx.font = 'bold 72px Arial'
  ctx.fillText(`${fanLevel}`, width / 2, height - 60)

  console.log('Badge generation complete, converting to data URL...')
  const dataUrl = canvas.toDataURL('image/png')
  console.log('Badge generated successfully, length:', dataUrl.length)
  return dataUrl
}

export const downloadBadge = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


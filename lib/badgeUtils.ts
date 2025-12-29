export const generateBadgeImage = async (
  canvas: HTMLCanvasElement,
  username: string,
  fanLevel: number,
  userImage?: string
): Promise<string> => {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get canvas context')

  const width = 800
  const height = 600
  canvas.width = width
  canvas.height = height

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1a1a1a')
  gradient.addColorStop(0.5, '#0066FF')
  gradient.addColorStop(1, '#FF0000')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // ETHMumbai logo area
  ctx.fillStyle = '#0066FF'
  ctx.font = 'bold 48px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('ETHMUMBAI', width / 2, 80)

  // Title
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 36px Arial'
  ctx.fillText('Maxi Checker', width / 2, 130)

  // User image (if provided)
  if (userImage) {
    const img = new Image()
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = userImage
    })

    const imgSize = 150
    const imgX = width / 2 - imgSize / 2
    const imgY = 180

    // Draw circular image
    ctx.save()
    ctx.beginPath()
    ctx.arc(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(img, imgX, imgY, imgSize, imgSize)
    ctx.restore()
  }

  // Username
  ctx.fillStyle = '#FFFFFF'
  ctx.font = 'bold 32px Arial'
  ctx.fillText(`@${username}`, width / 2, userImage ? 360 : 250)

  // Fan Level
  ctx.fillStyle = '#FFD700'
  ctx.font = 'bold 72px Arial'
  ctx.fillText(`${fanLevel}`, width / 2, userImage ? 450 : 340)

  // Fan Level Label
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '24px Arial'
  ctx.fillText('Fan Level', width / 2, userImage ? 490 : 380)

  // Decorative elements
  ctx.strokeStyle = '#FFFFFF'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(100, height - 100)
  ctx.lineTo(width - 100, height - 100)
  ctx.stroke()

  return canvas.toDataURL('image/png')
}

export const downloadBadge = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


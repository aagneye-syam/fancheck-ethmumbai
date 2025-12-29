export interface GameState {
  birdY: number
  birdVelocity: number
  pipes: Array<{ x: number; gapY: number }>
  score: number
  gameOver: boolean
  gameStarted: boolean
}

const GRAVITY = 0.3
const JUMP_STRENGTH = -6
const PIPE_SPEED = 2
export const PIPE_WIDTH = 60
export const PIPE_GAP = 150
export const BIRD_SIZE = 40

export const createInitialState = (canvasHeight: number): GameState => ({
  birdY: canvasHeight / 2,
  birdVelocity: 0,
  pipes: [],
  score: 0,
  gameOver: false,
  gameStarted: false,
})

export const updateGame = (
  state: GameState,
  canvasWidth: number,
  canvasHeight: number
): GameState => {
  if (state.gameOver || !state.gameStarted) {
    return state
  }

  // Update bird physics
  let newBirdY = state.birdY + state.birdVelocity
  let newVelocity = state.birdVelocity + GRAVITY

  // Check boundaries
  if (newBirdY < 0) {
    newBirdY = 0
    newVelocity = 0
  }
  if (newBirdY + BIRD_SIZE > canvasHeight) {
    return { ...state, gameOver: true }
  }

  // Update pipes
  const newPipes = state.pipes
    .map((pipe) => ({
      ...pipe,
      x: pipe.x - PIPE_SPEED,
    }))
    .filter((pipe) => pipe.x + PIPE_WIDTH > 0)

  // Add new pipe
  const lastPipe = newPipes[newPipes.length - 1]
  if (!lastPipe || lastPipe.x < canvasWidth - 350) {
    const gapY = Math.random() * (canvasHeight - PIPE_GAP - 100) + 50
    newPipes.push({
      x: canvasWidth,
      gapY,
    })
  }

  // Check collisions
  const birdX = 100
  const birdRect = {
    x: birdX,
    y: newBirdY,
    width: BIRD_SIZE,
    height: BIRD_SIZE,
  }

  for (const pipe of newPipes) {
    const pipeRect = {
      x: pipe.x,
      y: 0,
      width: PIPE_WIDTH,
      height: pipe.gapY,
    }
    const pipeRectBottom = {
      x: pipe.x,
      y: pipe.gapY + PIPE_GAP,
      width: PIPE_WIDTH,
      height: canvasHeight - (pipe.gapY + PIPE_GAP),
    }

    if (
      birdRect.x < pipeRect.x + pipeRect.width &&
      birdRect.x + birdRect.width > pipeRect.x &&
      birdRect.y < pipeRect.y + pipeRect.height
    ) {
      return { ...state, gameOver: true }
    }

    if (
      birdRect.x < pipeRectBottom.x + pipeRectBottom.width &&
      birdRect.x + birdRect.width > pipeRectBottom.x &&
      birdRect.y + birdRect.height > pipeRectBottom.y
    ) {
      return { ...state, gameOver: true }
    }

    // Score point
    if (pipe.x + PIPE_WIDTH < birdX && pipe.x + PIPE_WIDTH >= birdX - PIPE_SPEED) {
      return {
        ...state,
        birdY: newBirdY,
        birdVelocity: newVelocity,
        pipes: newPipes,
        score: state.score + 1,
      }
    }
  }

  return {
    ...state,
    birdY: newBirdY,
    birdVelocity: newVelocity,
    pipes: newPipes,
  }
}

export const jump = (state: GameState): GameState => {
  if (state.gameOver) {
    return state
  }
  if (!state.gameStarted) {
    return { ...state, gameStarted: true }
  }
  return {
    ...state,
    birdVelocity: JUMP_STRENGTH,
  }
}

export const calculateFanLevel = (score: number): number => {
  // Map score to 0-100 fan level
  // Higher scores = higher fan level
  // Cap at 100
  return Math.min(100, Math.floor(score * 2))
}


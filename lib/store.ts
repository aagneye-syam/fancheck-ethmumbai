import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  username: string | null
  fanLevel: number | null
  setUsername: (username: string) => void
  setFanLevel: (level: number) => void
  reset: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      username: null,
      fanLevel: null,
      setUsername: (username) => set({ username }),
      setFanLevel: (fanLevel) => set({ fanLevel }),
      reset: () => set({ username: null, fanLevel: null }),
    }),
    {
      name: 'ethmumbai-storage',
    }
  )
)


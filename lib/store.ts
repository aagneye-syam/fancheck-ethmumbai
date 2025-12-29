import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  username: string | null
  fanLevel: number | null
  survivalTime: number | null
  userImage: string | null
  setUsername: (username: string) => void
  setFanLevel: (level: number) => void
  setSurvivalTime: (time: number) => void
  setUserImage: (image: string | null) => void
  reset: () => void
  clearFanLevel: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      username: null,
      fanLevel: null,
      survivalTime: null,
      userImage: null,
      setUsername: (username) => set({ username }),
      setFanLevel: (fanLevel) => set({ fanLevel }),
      setSurvivalTime: (survivalTime) => set({ survivalTime }),
      setUserImage: (userImage) => set({ userImage }),
      reset: () => set({ username: null, fanLevel: null, survivalTime: null, userImage: null }),
      clearFanLevel: () => set({ fanLevel: null, survivalTime: null }),
    }),
    {
      name: 'ethmumbai-storage',
    }
  )
)


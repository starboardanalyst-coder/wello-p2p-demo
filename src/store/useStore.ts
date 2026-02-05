import { create } from 'zustand'

interface AppState {
  userRole: 'lender' | 'borrower' | null
  isRegistered: boolean
  registerStep: number
  setUserRole: (role: 'lender' | 'borrower') => void
  setRegistered: (v: boolean) => void
  setRegisterStep: (step: number) => void
}

export const useStore = create<AppState>((set) => ({
  userRole: null,
  isRegistered: false,
  registerStep: 1,
  setUserRole: (role) => set({ userRole: role }),
  setRegistered: (v) => set({ isRegistered: v }),
  setRegisterStep: (step) => set({ registerStep: step }),
}))

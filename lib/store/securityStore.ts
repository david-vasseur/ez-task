import { create } from 'zustand'

type SecurityState = {
    jwt: string
    setJwt: (jwt: string) => void
}

export const useSecurityStore = create<SecurityState>((set) => ({
    jwt: '',

    setJwt: (jwt) => set({ jwt })
}))
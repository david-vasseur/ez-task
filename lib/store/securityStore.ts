import { create } from 'zustand'

type SecurityState = {
    csrf: string
    jwt: string
    setCsrf: (csrf: string) => void
    setJwt: (jwt: string) => void
}

export const useSecurityStore = create<SecurityState>((set) => ({
    csrf: '',
    jwt: '',

    setCsrf: (csrf) => set({ csrf }),
    setJwt: (jwt) => set({ jwt })
}))
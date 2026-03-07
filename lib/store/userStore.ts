import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

type UserState = {
    isConnected: boolean
    id: number
    name: string
    firstName: string
    email: string
    family: string
    familyId: number
    hash: string | null
    isOwner: boolean

    socket: Socket | null

    addUser: (user: Partial<UserState>) => void
    removeUser: () => void
    updateName: (name: string) => void
    updateFirstName: (firstName: string) => void
    addFamily: (data: Partial<UserState>) => void
}

export const useUserStore = create<UserState>((set, get) => ({
    isConnected: false,
    id: 0,
    name: '',
    firstName: '',
    email: '',
    family: '',
    familyId: 0,
    hash: null,
    isOwner: false,
    socket: null,

    addUser: (user) => {
        const socket = io('wss://ez-task.fr/api', {
        query: {
            userId: user.id,
            userFirstName: user.firstName,
        },
    })

    socket.on('connect', () => {
        console.log(`l'utilisateur ${user.firstName} vient de se connecter`)
    })

    socket.on('disconnect', () => {
        console.log(`l'utilisateur ${user.firstName} vient de se déconnecter`)
    })

    set({
        ...user,
        isConnected: true,
        socket
        } as UserState)
    },

    removeUser: () => {
        const socket = get().socket
        socket?.disconnect()

        set({
        isConnected: false,
        id: 0,
        name: '',
        firstName: '',
        email: '',
        family: '',
        familyId: 0,
        hash: null,
        isOwner: false,
        socket: null
        })
    },

    updateName: (name) =>
        set({ name }),

    updateFirstName: (firstName) =>
        set({ firstName }),

    addFamily: (data) =>
        set((state) => ({
        family: data.family ?? state.family,
        familyId: data.familyId ?? state.familyId,
        hash: data.hash ?? state.hash,
        isOwner: data.isOwner ?? state.isOwner
    }))
}))
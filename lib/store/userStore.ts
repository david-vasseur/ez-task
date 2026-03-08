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

    token: string | null      
    socket: Socket | null

    addUser: (user: Partial<UserState> & { token?: string }) => void
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
    token: null,      
    socket: null,

    addUser: (user) => {
        const socket = io('/api/websocket', {
            auth: { token: user.token },  
            path: '/api/websocket',  
        });

        socket.on('connect', () => {
            console.log(`L'utilisateur ${user.firstName} vient de se connecter`);
        });

        socket.on('disconnect', () => {
            console.log(`L'utilisateur ${user.firstName} vient de se déconnecter`);
        });

        set({
            ...user,
            isConnected: true,
            socket
        } as UserState);
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
            token: null,    // ← on reset le token
            socket: null
        })
    },

    updateName: (name) => set({ name }),
    updateFirstName: (firstName) => set({ firstName }),

    addFamily: (data) =>
        set((state) => ({
            family: data.family ?? state.family,
            familyId: data.familyId ?? state.familyId,
            hash: data.hash ?? state.hash,
            isOwner: data.isOwner ?? state.isOwner
        }))
}))
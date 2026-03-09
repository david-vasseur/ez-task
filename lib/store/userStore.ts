import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
    isConnected: boolean;
    id: number;
    name: string;
    firstName: string;
    email: string;
    family: string;
    familyId: number;
    hash: string | null;
    isOwner: boolean;
    token: string | null;

    addUser: (user: Partial<UserState> & { token?: string }) => void;
    removeUser: () => void;
    updateName: (name: string) => void;
    updateFirstName: (firstName: string) => void;
    addFamily: (data: Partial<UserState>) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
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

            addUser: (user) => {
                set({
                    ...user,
                    isConnected: true,
                } as UserState);
            },

            removeUser: () => {
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
                    token: null,
                });
            },

            updateName: (name) => set({ name }),
            updateFirstName: (firstName) => set({ firstName }),

            addFamily: (data) =>
                set((state) => ({
                    family: data.family ?? state.family,
                    familyId: data.familyId ?? state.familyId,
                    hash: data.hash ?? state.hash,
                    isOwner: data.isOwner ?? state.isOwner,
                })),
            }),
            {
            name: 'user-store',
            partialize: (state) => ({
                isConnected: state.isConnected,
                id: state.id,
                name: state.name,
                firstName: state.firstName,
                email: state.email,
                family: state.family,
                familyId: state.familyId,
                hash: state.hash,
                isOwner: state.isOwner,
                token: state.token,
            }),
        }
    )
);
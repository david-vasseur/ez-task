import { create } from 'zustand';

type ModalState = {
    isVisible: boolean
    title: string
    message: string
    showModal: (title: string, message: string) => void
    hideModal: () => void
    }

export const useModalStore = create<ModalState>((set) => ({
    isVisible: false,
    title: '',
    message: '',

    showModal: (title, message) =>
        set({
        isVisible: true,
        title,
        message
        }),

    hideModal: () =>
        set({
        isVisible: false,
        title: '',
        message: ''
        })
}));
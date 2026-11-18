import { useState } from "react";

interface ModalOptional {
    confirmText?: string;
    dismissText?: string;
    onConfirm?: () => void;
    onDismiss?: () => void;
}

export interface ModalState extends ModalOptional {
    show: boolean;
    title: string;
    message: string;
}

export function useModal() {
    const [state, setState] = useState<ModalState>({
        show: false,
        title: "",
        message: ""
    });

    const close = () => setState((prev) => ({...prev, show: false}));

    return {
        state,
        showModal: (title: string, message: string, options: ModalOptional = {}) => 
            setState({show: true, title: title, message: message, ...options}),
        confirm: () => {
            state.onConfirm?.();
            close();
        },
        dismiss: () => {
            state.onDismiss?.();
            close();
        }
    };
}
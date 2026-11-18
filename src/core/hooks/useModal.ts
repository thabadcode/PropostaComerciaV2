import { useState } from "react";

export interface ModalState {
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

    return {
        state,
        showModal: (title: string, message: string) => 
            setState({show: true, title: title, message: message}),
        close: () => setState((prev) => ({...prev, show: false}))
    };
}
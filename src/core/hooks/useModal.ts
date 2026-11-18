import { useState } from "react";

export interface ModalState {
    show: boolean;
    title: string;
    message: string;
}

export function useModal() {
    const [modal, setModal] = useState<ModalState>({
        show: false,
        title: "",
        message: ""
    });

    return {
        modal,
        showModal: (title: string, message: string) => 
            setModal({show: true, title: title, message: message}),
        close: () => setModal({show: false, title: "", message: ""})
    };
}
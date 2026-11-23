import { Info, type LucideIcon } from "lucide-react"
import { useCallback, useRef, useState } from "react"

export type ToastState = {
    show: boolean,
    icon: LucideIcon,
    message: string
}

const DURATION_MS = 3000;

export function useToast() {
    const [state, setState] = useState<ToastState>({
        show: false,
        icon: Info,
        message: ""
    })

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTime = () => {
        if(timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    const hide = useCallback(() => {
        clearTime();
        setState((prev) => ({...prev, show: false}));
    }, []);

    const show = useCallback((icon: LucideIcon, message: string) =>{
        clearTime();
        setState({show: true, icon: icon, message: message});
        timerRef.current = setTimeout(hide, DURATION_MS);
    }, [hide]);

    return { state, show, hide }
}
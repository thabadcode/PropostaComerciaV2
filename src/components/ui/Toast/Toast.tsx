import { type LucideIcon } from "lucide-react";
import style from './Toast.module.css';

export function Toast(
    {show, icon: Icon, message}:
    {show: boolean, icon: LucideIcon, message: string}
) {
    const className = `${style.Toast} ${show ? style.Visible : ""}`;
    return (
        <div
            className={className}
            role="status"
            aria-live="polite"
            aria-hidden={!show}
        >
            <Icon/>
            <p>{message}</p>
        </div>
    );
}
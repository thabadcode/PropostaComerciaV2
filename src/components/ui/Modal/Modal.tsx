import { useEffect } from 'react';
import { Info } from 'lucide-react';
import Button from '../Button/Button';
import style from './Modal.module.css';

interface ModalProps {
    show: boolean;
    title: string;
    message: string;
    confirmText: string;
    dismissText?: string;
    onConfirm: () => void;
    onDismiss?:  () => void;
}

export default function Modal({
    show,
    title,
    message,
    confirmText,
    dismissText,
    onConfirm,
    onDismiss,
}: ModalProps) {
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (onDismiss) onDismiss();
                else onConfirm();
            }
            else if (event.key === 'Enter'&& !event.isComposing) {
                event.preventDefault();
                onConfirm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [show, onConfirm, onDismiss]);

    return (
        <div className={`${style.Backdrop} ${show ? style.show : ""}`}>
            <div
                role={dismissText ? "alertdialog" : "alert"}
                aria-modal="true"
                className={style.Modal}
            >
                <h2><Info className={style.Icon}/>{title}</h2>
                <p>{message}</p>
                <div className={style.ModalButtons}>
                    {dismissText && onDismiss && (
                        <Button text={dismissText} onClick={onDismiss}/>
                    )}
                    <Button text={confirmText} onClick={onConfirm}/>
                </div>
            </div>
        </div>
    );
};
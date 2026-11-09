import type { ElementType } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    icon?: ElementType;
    text: string;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({icon: Icon, text, disabled, onClick}: ButtonProps) {
    return(
        <button
            type='button'
            disabled={disabled}
            onClick={onClick}
            className={disabled ? styles.ButtonDisabled : styles.Button}
        >
        {Icon && <Icon size={20}/>}
        {text}
        </button>
    )
}
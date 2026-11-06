import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({ text, disabled, onClick }: ButtonProps) {
    return(
        <button
            type='button'
            disabled={disabled}
            onClick={onClick}
            className={disabled ? styles.ButtonDisabled : styles.Button}
        >
        {text}
        </button>
    )
}
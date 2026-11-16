import { useRef } from 'react';
import style from './Input.module.css'

interface InputProps {
    label: string;
    type: string;
    prefix?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    isValid?: boolean;
    supportingText?: string;
    action?: React.ReactNode;
}

export default function Input({
    label,
    type="text",
    prefix,
    value,
    onChange,
    placeholder,
    disabled,
    isValid,
    supportingText,
    action
}: InputProps) {
    const actionRef = useRef<HTMLSpanElement>(null);

    const getClassName = () => {
        if (disabled) return style.DisabledField;
        return isValid ? style.Field : style.InvalidField;
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;

        const target = actionRef.current?.querySelector<HTMLElement>(
            'button, [role="button"], a[href]'
        );

        if (target) {
            e.preventDefault();
            target.click();
        }
    };
    
    return (
        <label className={style.Input}>
            <span className={style.LabelText}>{label}</span>
            <div className={style.FieldLine}>
                <span className={style.Prefix}>{prefix}</span>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    className={getClassName()}
                    aria-invalid={!isValid}
                    aria-describedby={supportingText && !isValid ? `${label}-error` : undefined}
                />
                {action && (<span ref={actionRef}>{action}</span>)}
            </div>
            {supportingText && !isValid &&
                <span id={`${label}-error`} className={style.SupportingText}>
                    {supportingText}
                </span>
            }
        </label>
    )
}
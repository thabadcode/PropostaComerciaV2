import { useRef } from 'react';
import style from './Input.module.css'

interface InputProps {
    label: string;
    type?: string;
    prefix?: string;
    value: string;
    list?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
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
    list,
    onChange,
    onBlur,
    onFocus,
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
                    list={list}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
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
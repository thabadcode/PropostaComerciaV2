import { useState } from 'react';
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
    supportingText
}: InputProps) {
    const [isTouched, setTouched] = useState(false);

    const getClassName = () => {
        if (disabled) return style.DisabledField;
        return isValid && !isTouched ? style.Field : style.InvalidField;
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
                    onChange={ e => {
                        onChange(e);
                        setTouched(true);
                    }}
                    disabled={disabled}
                    className={getClassName()}
                    aria-invalid={!isValid}
                    aria-describedby={supportingText && !isValid ? `${label}-error` : undefined}
                />
            </div>
            {supportingText && !isValid &&
                <span id={`${label}-error`} className={style.SupportingText}>
                    {supportingText}
                </span>
            }
        </label>
    )
}
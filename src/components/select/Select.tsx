import { useState } from 'react';
import style from './Select.module.css'

interface SelectProps {
    label: string;
    options: Array<string>;
    value: string;
    onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: React.FocusEventHandler<HTMLSelectElement>;
    onFocus: React.FocusEventHandler<HTMLSelectElement>;
    isValid: boolean;
    supportingText?: string;
    disabled?: boolean;
}

export default function Select({
    label,
    options,
    value,
    onSelected,
    isValid,
    supportingText,
    disabled=false
}: SelectProps) {
    const [isTouched, setTouched] = useState(false);

    const getClassName = () => {
        if (disabled) return style.DisabledField;
        return !isValid ? style.InvalidField : style.Field;
    };

    return (
        <label className={style.Select}>

            <span className={style.LabelText}>{label}</span>
            <select 
                value={value}
                onChange={ (e) => {
                    onSelected(e);
                    setTouched(true);
                }}
                className={getClassName()}
                disabled={disabled}
                aria-invalid={!isValid}
                aria-describedby={supportingText && !isValid ? `${label}-error` : undefined}
            >
                {!isTouched ? <option key={0} value="">Selecione...</option> : undefined}
                {options.map((option, index) => (
                    <option key={index+1} value={option}>{option}</option>
                ))}
            </select>
            {supportingText && !isValid &&
                <span id={`${label}-error`} className={style.SupportingText}>
                    {supportingText}
                </span>
            }
        </label>
    )
}
import { useId } from 'react';
import style from './Select.module.css';

interface SelectProps {
    label: string;
    options: readonly string[];
    value: string;
    onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: React.FocusEventHandler<HTMLSelectElement>;
    onFocus: React.FocusEventHandler<HTMLSelectElement>;
    isValid: boolean;
    supportingText: string;
}

export default function Select({
    label,
    options,
    value,
    onSelected,
    onBlur,
    onFocus,
    isValid,
    supportingText
}: SelectProps) {
    const errorId = useId();
    const showError = Boolean(supportingText) && !isValid

    return (
        <label className={style.Select}>
            <span className={style.LabelText}>{label}</span>
            <select 
                value={value}
                onChange={onSelected}
                onBlur={onBlur}
                onFocus={onFocus}
                className={!isValid ? style.InvalidField : style.Field}
                aria-invalid={!isValid}
                aria-describedby={showError ? errorId : undefined}
            >
                {value === "" && <option value="">Selecione...</option>}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {showError &&
                <span id={errorId} className={style.SupportingText}>
                    {supportingText}
                </span>
            }
        </label>
    )
}
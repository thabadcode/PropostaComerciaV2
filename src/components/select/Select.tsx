import style from './Select.module.css'

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
                aria-describedby={supportingText && !isValid ? `${label}-error` : undefined}
            >
                {value === "" ? <option key={0} value="">Selecione...</option> : undefined}
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
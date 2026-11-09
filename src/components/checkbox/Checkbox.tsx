import style from "./Checkbox.module.css";
import { Check } from "lucide-react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    disabled?: boolean;
    onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
    label,
    checked,
    disabled=false,
    onCheck
}: CheckboxProps) {
    return (
        <label className={style.Checkbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onCheck}
                disabled={disabled}
                className={disabled ? style.DisableInput : style.Input}
            />
            <span className={style.Checkmark}>
                <Check />
            </span>
            <span className={style.LabelText}>{label}</span>
        </label>
    );
}


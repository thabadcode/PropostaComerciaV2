import style from './Textarea.module.css';

interface TextareaProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
    label,
    value,
    onChange
}: TextareaProps) {
    return (
        <label className={style.Textarea}>
            <span className={style.LabelTextarea}>{label}</span>
            <textarea
                className={style.InputTextarea}
                onChange={onChange}
                rows={3}
                wrap="hard"
            >{value}</textarea>
        </label>
    );
}
import type { LucideIcon } from "lucide-react";
import style from './FormSection.module.css';

export function FormSection( //Tem problema o default aqui?
    {icon: Icon, title, children}:
    {icon: LucideIcon; title: string; children: React.ReactNode}) {
    return (
        <div className={style.Form}>
            <h2><Icon/>{title}</h2>
            {children}
        </div>
    );
}

export function FormRow({children}: {children: React.ReactNode}) {
    return <div className={style.Row}>{children}</div>;
}
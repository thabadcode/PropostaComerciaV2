import type { LucideIcon } from "lucide-react";
import style from './Card.module.css';

export function Card(
    {id, icon: Icon, title, children}:
    {id?: string, icon: LucideIcon; title: string; children: React.ReactNode}) {
    return (
        <div id={id} className={style.Form}>
            <h2><Icon/>{title}</h2>
            <hr/>
            {children}
        </div>
    );
}

export function FormRow({children}: {children: React.ReactNode}) {
    return <div className={style.Row}>{children}</div>;
}
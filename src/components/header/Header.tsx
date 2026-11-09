import style from "./Header.module.css";
import Button from "../button/Button";
import { BrushCleaning, FileText } from "lucide-react";

interface HeaderProps {
    clearAll: () => void;
    generatePDF: () => void;
}

export default function Header({ clearAll, generatePDF }: HeaderProps) {
    return (
        <header className={style.Header}>
            <img src="/logo-t-oliver.webp" alt="Company logo" />
            <h1>Proposta Comercial</h1>
            <a href="#products-table">Tabela</a>
            <a href="#preview-pdf">Pré-Visualização</a>
            <div className={style.HeaderActions}>
                <Button
                    icon={BrushCleaning}
                    text="Limpar tudo"
                    onClick={clearAll}
                />
                <Button
                    icon={FileText}
                    text="Gerar PDF"
                    onClick={generatePDF}
                />
            </div>
        </header>
    );
}
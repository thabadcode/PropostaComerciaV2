import style from "./Header.module.css";
import Button from "../ui/Button/Button";
import { BrushCleaning, Download, FileText } from "lucide-react";

interface HeaderProps {
    clearAll: () => void;
    exportJson: () => void;
    generatePDF: () => void;
}

export default function Header({ clearAll, exportJson, generatePDF }: HeaderProps) {
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
                    icon={Download}
                    text="Exportar JSON"
                    onClick={exportJson}
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
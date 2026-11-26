import style from "./Header.module.css";
import Button from "../ui/Button/Button";
import {
    BrushCleaning,
    Download,
    FileText,
    Import,
    Menu,
    X,
} from "lucide-react";
import { useRef, useState } from "react";
import { PROVIDER_INFO } from "../../core/constants/providerInfo";
import logo from "../../assets/logo.webp";

interface HeaderProps {
    clearAll: () => void;
    exportJson: () => void;
    importJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
    generatePDF: () => void;
}

export default function Header({
    clearAll,
    exportJson,
    importJson,
    generatePDF,
}: HeaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className={style.Header}>
            <button
                type="button"
                aria-label="Menu"
                onClick={() => setShowMenu((v) => !v)}
                className={style.HamburgerButton}
            >
                {showMenu ? <X /> : <Menu />}
            </button>

            <img
                src={logo}
                alt={PROVIDER_INFO.company.name}
                className={style.Logo}
            />

            <h1 className={style.CompanyName}>Proposta Comercial</h1>

            {showMenu && (
                <div
                    className={style.Overlay}
                    onClick={() => setShowMenu(false)}
                />
            )}

            <div
                className={`${style.Menu} ${showMenu ? style.Open : ""}`}
                onClick={(e) => {
                    if ((e.target as Element).closest("a, button"))
                        setShowMenu(false);
                }}
            >
                <nav className={style.Navigation}>
                    <a href="#forms">Formulários</a>
                    <a href="#products-table">Tabela</a>
                    <a href="#preview-pdf">Pré-Visualização</a>
                </nav>

                <div className={style.Actions}>
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
                        icon={Import}
                        text="Importar JSON"
                        onClick={() => inputRef.current?.click()}
                    />
                    <Button
                        icon={FileText}
                        text="Gerar PDF"
                        onClick={generatePDF}
                    />
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept=".json,application/json"
                style={{ display: "none" }}
                onChange={importJson}
            />
        </header>
    );
}

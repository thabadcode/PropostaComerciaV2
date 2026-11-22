import type { MainFormState } from "../hooks/useMainForm";
import type { Product } from "../hooks/useProducts";
import { buildSnapshot } from "./snapshot";

export function exportJson(
    mainForm: MainFormState,
    products: Product[],
    showModal: (title: string, message: string) => void
) {
    if (!mainForm.isValid) {
        mainForm.touchAll();
        showModal(
            "Campos inválidos",
            "Preencha corretamente os dados do cabeçalho antes de exportar."
        );
        return;
    }
    if (products.length === 0) {
        showModal(
            "Nenhum produto adicionado",
            "Adicione ao menos um produto para exportar."
        );
        return;
    }

    const jsonToExport = JSON.stringify(buildSnapshot(mainForm, products), null, 2);
    const blob = new Blob([jsonToExport], {type: "application/json;charset=utf-8"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${document.title}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
}
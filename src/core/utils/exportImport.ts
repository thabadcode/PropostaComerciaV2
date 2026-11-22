import type { MainFormState } from "../hooks/useMainForm";
import type { ProductsState } from "../hooks/useProducts";
import type { Snapshot } from "./snapshot";

export function exportJson(
    mainForm: MainFormState,
    products: ProductsState,
    showModal: (title: string, message: string) => void
) {
    if (!mainForm.isValid) {
        showModal(
            "Campos inválidos",
            "Preencha corretamente os dados do cabeçalho antes de exportar."
        );
        return;
    }
    if (products.products.length === 0) {
        showModal(
            "Nenhum produto adicionado",
            "Adicione ao menos um produto para exportar."
        );
        return;
    }

    const snapshot: Snapshot = {
        mainForm: {
            date: mainForm.date.value,
            cnpj: mainForm.cnpj.value,
            companyName: mainForm.companyName.value,
            representative: mainForm.representative.value,
            paymentCondition: mainForm.paymentCondition.value,
            observations: mainForm.observations.value,
            showTotal: mainForm.showTotal.value,
            showPS: mainForm.showPS.value
        },
        products: products.products
    };

    const jsonToExport = JSON.stringify(snapshot, null, 2);
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
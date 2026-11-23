import type { MainFormState } from "../hooks/useMainForm";
import type { ProductsState } from "../hooks/useProducts";
import { buildSnapshot, isSnapshot, type Snapshot } from "./snapshot";
import type { Product } from "./types";

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

export async function importJson(
    mainForm: MainFormState,
    products: ProductsState,
    event: React.ChangeEvent<HTMLInputElement>,
    showModal: (title: string, message: string) => void
) {
    const input = event.target;
    const file: File | undefined = input.files?.[0];
    if (!file) {
        showModal(
            "Nenhum arquivo selecionado",
            "Selecione um arquivo JSON para realizar a importação."
        );
        return;
    }

    const showInvalidFile = () =>
        showModal(
            "Arquivo inválido",
            "Não foi possível importar. Verifique se o arquivo é um JSON válido e exportado por este sistema."
        );
    
    try {
        const data: unknown = JSON.parse(await file.text());
        if (!isSnapshot(data)) {
            showInvalidFile();
            return;
        }
        const { mainForm: form, products: items } = data;
        
        mainForm.date.setValue(form.date);
        mainForm.cnpj.setValue(form.cnpj);
        mainForm.companyName.setValue(form.companyName);
        mainForm.representative.setValue(form.representative);
        mainForm.paymentCondition.setValue(form.paymentCondition);
        mainForm.observations.setValue(form.observations);
        mainForm.showTotal.setValue(form.showTotal);
        mainForm.showPS.setValue(form.showPS);

        products.reset();
        items.forEach((p) => products.insertProduct(p));
    } catch (error) {
        console.error("Falha ao importar o arquivo", error)
        showInvalidFile();
    } finally {
        input.value = "";
    }
}
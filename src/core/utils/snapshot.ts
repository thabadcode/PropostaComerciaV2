import type { MainFormState } from "../hooks/useMainForm";
import type { Product } from "../hooks/useProducts";

const STORAGE_KEY = "proposal:v1";

export type Snapshot = {
    mainForm: {
        companyName: string;
        cnpj: string;
        representative: string;
        observations: string;
        date: string;
        paymentCondition: string;
        showTotal: boolean,
        showPS: boolean
    },
    products: Product[];
};

export function loadSnapshot(): Snapshot | null {
    try {
        const dataSaved = localStorage.getItem(STORAGE_KEY);
        return dataSaved === null ? null : JSON.parse(dataSaved) as Snapshot;
    } catch (error) {
        console.error("Não foi possível carregar dados salvos", error);
        return null;
    }
}

export function saveSnapshot(snapshot: Snapshot) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function describeStorageError(error: unknown): string {
    if (error instanceof DOMException) {
        if (error.name === "QuotaExceededError") {
            return "O armazenamento do navegador está cheio. Seu rascunho não está sendo salvo.";
        }
        if (error.name === "SecurityError") {
            return "O navegador bloqueou o armazenamento local. Seu rascunho não será salvo.";
        }
    }
    return "Não foi possível salvar o rascunho automaticamente.";
}

export function buildSnapshot(
    mainForm: MainFormState,
    products: Product[]
): Snapshot {
    return {
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
        products: products
    };
}
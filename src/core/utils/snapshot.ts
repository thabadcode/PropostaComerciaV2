import type { MainFormState } from "../hooks/useMainForm";
import type { Product } from "./types";

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

function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null;
}

function isProduct(v: unknown): v is Product {
    if (!isRecord(v)) return false;
    return (
        typeof v.id === "string" &&
        typeof v.description === "string" &&
        typeof v.freightType === "string" &&
        typeof v.isClientCap === "boolean" &&
        (v.asphaltBinderContent === null || typeof v.asphaltBinderContent === "string") &&
        typeof v.unit === "string" &&
        typeof v.quantity === "number" &&
        typeof v.price === "number"
    );
}

export function isSnapshot(v: unknown): v is Snapshot {
    if (!isRecord(v) || !isRecord(v.mainForm)) return false;
    const m = v.mainForm;
    return (
        typeof m.companyName === "string" &&
        typeof m.cnpj === "string" &&
        typeof m.representative === "string" &&
        typeof m.observations === "string" &&
        typeof m.date === "string" &&
        typeof m.paymentCondition === "string" &&
        typeof m.showTotal === "boolean" &&
        typeof m.showPS === "boolean" &&
        Array.isArray(v.products) &&
        v.products.every(isProduct)
    );
}

export function loadSnapshot(): Snapshot | null {
    try {
        const dataSaved = localStorage.getItem(STORAGE_KEY);
        if (dataSaved === null) return null;

        const parsed: unknown = JSON.parse(dataSaved);
        if (!isSnapshot(parsed)) {
            console.warn("Snapshot salvo em formato inválido ou comrrompido. Ignorando.");
            return null;
        }

        return parsed;
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
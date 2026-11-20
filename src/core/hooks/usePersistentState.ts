import { useEffect, useRef } from "react";
import type { Product } from "./useProducts";
import type { MainFormState } from "./useMainForm";

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

export function usePersistentState(
    mainForm: MainFormState,
    products: Product[],
    showModalError: (title: string, message: string) => void
) {
    const showModalErrorRef = useRef(showModalError);
    const warnedRef = useRef(false);

    useEffect(() => {
        showModalErrorRef.current = showModalError;
    }, [showModalError])

    useEffect(() => {
        const proposalData: Snapshot = {
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
            products: products,
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(proposalData));
            warnedRef.current = false;
        } catch (error) {
            console.error("Ocorreu um erro e não foi possível salvar", error);
            if (!warnedRef.current) {
                warnedRef.current = true;
                showModalErrorRef.current(
                    "Erro ao salvar rascunho",
                    messageErrorException(error),
                );
            }
        }
    }, [
        mainForm.date.value,
        mainForm.cnpj.value,
        mainForm.companyName.value,
        mainForm.representative.value,
        mainForm.paymentCondition.value,
        mainForm.observations.value,
        mainForm.showTotal.value,
        mainForm.showPS.value,
        products
    ]);
}

function messageErrorException(error: unknown): string {
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
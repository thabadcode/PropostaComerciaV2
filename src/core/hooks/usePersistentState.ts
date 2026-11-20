import { useEffect, useRef } from "react";
import type { Product } from "./useProducts";
import type { MainFormState } from "./useMainForm";
import { describeStorageError, saveSnapshot, type Snapshot} from "../utils/snapshot";

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
            saveSnapshot(proposalData);
            warnedRef.current = false;
        } catch (error) {
            console.error("Ocorreu um erro e não foi possível salvar", error);
            if (!warnedRef.current) {
                warnedRef.current = true;
                showModalErrorRef.current(
                    "Erro ao salvar rascunho",
                    describeStorageError(error),
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
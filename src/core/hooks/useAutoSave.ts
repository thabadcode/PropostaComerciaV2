import { useEffect, useRef } from "react";
import type { Product } from "../utils/types";
import type { MainFormState } from "./useMainForm";
import { buildSnapshot, describeStorageError, saveSnapshot} from "../utils/snapshot";

const DEBOUNCE_MS = 600;

export function useAutoSave(
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
        const timerId = setTimeout(() => {
            try {
                saveSnapshot(buildSnapshot(mainForm, products));
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
        }, DEBOUNCE_MS);

        return () => clearTimeout(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        mainForm.date.value,
        mainForm.proposalNumber.value,
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
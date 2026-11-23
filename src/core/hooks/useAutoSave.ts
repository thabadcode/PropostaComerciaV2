import { useEffect, useRef } from "react";
import type { Product } from "../utils/types";
import type { MainFormState } from "./useMainForm";
import { buildSnapshot, describeStorageError, saveSnapshot} from "../utils/snapshot";

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
    }, [
        mainForm,
        products
    ]);
}
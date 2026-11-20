import { useFormField, type Validator } from "./useFormField";
import type { Snapshot } from "./usePersistentState";
import { rules } from "../utils/rules";

export type MainFormState = ReturnType<typeof useMainForm>;

const optional = (rule: Validator<string>): Validator<string> =>
    (v) => (v.trim() === "" ? null : rule(v));

export function useMainForm(saved?: Snapshot["mainForm"]) {
    const date = useFormField<string>("", rules.required, saved?.date);
    const cnpj = useFormField<string>("", optional(rules.cnpj), saved?.cnpj);
    const companyName = useFormField<string>("", rules.required, saved?.companyName);
    const representative = useFormField<string>("", undefined, saved?.representative);
    const paymentCondition = useFormField<string>("", rules.required, saved?.paymentCondition);
    const observations = useFormField<string>("", undefined, saved?.observations);
    const showTotal = useFormField<boolean>(true, undefined, saved?.showTotal);
    const showPS = useFormField<boolean>(true, undefined, saved?.showPS);

    const fields = [
        date, cnpj, companyName, representative,
        paymentCondition, observations, showTotal, showPS,
    ];

    return {
        date, cnpj, companyName, representative,
        paymentCondition, observations, showTotal, showPS,
        isValid: fields.every((f) => f.isValid),
        touchAll: () => fields.forEach((f) => f.touch()),
        reset: () => fields.forEach((f) => f.reset())
    };
}
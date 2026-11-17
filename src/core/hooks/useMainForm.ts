import { useFormField, type Validator } from "./useFormField";
import { rules } from "../utils/rules";

export type MainFormState = ReturnType<typeof useMainForm>;

const optional = (rule: Validator<string>): Validator<string> =>
    (v) => (v.trim() === "" ? null : rule(v));

export function useMainForm() {
    const date = useFormField<string>("", rules.required);
    const cnpj = useFormField<string>("", optional(rules.cnpj));
    const companyName = useFormField<string>("", rules.required);
    const representative = useFormField<string>("");
    const paymentCondition = useFormField<string>("", rules.required);
    const observations = useFormField<string>("");
    const showTotal = useFormField<boolean>(true);
    const showPS = useFormField<boolean>(true);

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
import { useFormField, type Validator } from "./useFormField";
import { rules } from "../utils/rules";

export type MainFormState = ReturnType<typeof useMainForm>;

const optional = (rule: Validator<string>): Validator<string> =>
    (v) => (v.trim() === "" ? null : rule(v));

export function useMainForm() {
    const date = useFormField("", rules.required);
    const cnpj = useFormField("", optional(rules.cnpj));
    const companyName = useFormField("", rules.required);
    const representative = useFormField("");
    const paymentCondition = useFormField("", rules.required);
    const observations = useFormField("");
    const showTotal = useFormField(true);
    const showPS = useFormField(true);

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
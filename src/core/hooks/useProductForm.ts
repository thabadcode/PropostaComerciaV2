import { useFormField } from "./useFormField";
import { rules } from "../utils/rules";

export type ProductFormState = ReturnType<typeof useProductForm>;

export function useProductForm() {
    const description = useFormField("", rules.required);
    const freightType = useFormField("", rules.required);
    const isClientCap = useFormField(false);
    const asphaltBinderContent = useFormField("", (value) => {
        if(isClientCap.value) return rules.binderContent(value);
        return null;
    });
    const unit = useFormField("", rules.required);
    const amount = useFormField("", rules.positiveNumber);
    const price = useFormField("", rules.positiveNumber);

    const fields = [
        description, freightType, isClientCap, asphaltBinderContent, unit,
        amount, price
    ];

    return {
        description, freightType, isClientCap,
        asphaltBinderContent, unit, amount, price,
        isValid: fields.every((f) => f.isValid),
        touchAll: () => fields.forEach((f) => f.touch()),
        reset: () => fields.forEach((f) => f.reset())
    };
}
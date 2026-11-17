import { useFormField } from "./useFormField";
import { rules } from "../utils/rules";

export type ProductFormState = ReturnType<typeof useProductForm>;

export function useProductForm() {
    const description = useFormField<string>("", rules.required);
    const freightType = useFormField<string>("", rules.required);
    const isClientCap = useFormField<boolean>(false);
    const asphaltBinderContent = useFormField<string>("", (value) => {
        if(isClientCap.value) return rules.binderContent(value);
        return null;
    });
    const unit = useFormField<string>("", rules.required);
    const amount = useFormField<string>("", rules.positiveNumber);
    const price = useFormField<string>("", rules.positiveNumber);

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
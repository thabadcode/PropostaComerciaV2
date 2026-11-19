import { useFormField } from "./useFormField";
import { rules } from "../utils/rules";
import type { Product } from "./useProducts";

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

    const toProduct = (): Product => {
        let finalDescription = `${description.value} - ${freightType.value}`;
        if (isClientCap.value) {
            finalDescription += ` - CAP por conta do cliente - Teor ${asphaltBinderContent.value}%`;
        }

        return {
            description: finalDescription,
            unit: unit.value,
            quantity: Number(amount.value),
            price: Number(price.value)
        };
    };

    return {
        description, freightType, isClientCap,
        asphaltBinderContent, unit, amount, price,
        isValid: fields.every((f) => f.isValid),
        touchAll: () => fields.forEach((f) => f.touch()),
        reset: () => fields.forEach((f) => f.reset()),
        toProduct
    };
}
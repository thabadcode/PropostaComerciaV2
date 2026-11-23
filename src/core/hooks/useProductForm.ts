import { useFormField } from "./useFormField";
import { rules } from "../utils/rules";
import { type DescriptionParsed, parseDescription, type Product } from "./useProducts";
import { useState } from "react";

export type ProductFormState = ReturnType<typeof useProductForm>;

export function useProductForm() {
    const [editingId, setEditingId] = useState<string | null>(null);
    const isEditing = editingId !== null;

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
            id: editingId ?? crypto.randomUUID(),
            description: finalDescription,
            unit: unit.value,
            quantity: Number(amount.value),
            price: Number(price.value)
        };
    };

    const setProdutctToEdit = (p: Product) => {
        const descriptionParsed: DescriptionParsed = parseDescription(p.description);
        description.setValue(descriptionParsed.description);
        freightType.setValue(descriptionParsed.freightType);
        isClientCap.setValue(descriptionParsed.isClientCap);
        asphaltBinderContent.setValue(descriptionParsed.asphaltBinderContent ?? "");
        unit.setValue(p.unit);
        amount.setValue(String(p.quantity));
        price.setValue(String(p.price));
        setEditingId(p.id);
    }

    return {
        isEditing,
        description, freightType, isClientCap,
        asphaltBinderContent, unit, amount, price,
        isValid: fields.every((f) => f.isValid),
        editProduct: setProdutctToEdit,
        touchAll: () => fields.forEach((f) => f.touch()),
        reset: () => {
            fields.forEach((f) => f.reset());
            setEditingId(null);
        },
        toProduct
    };
}
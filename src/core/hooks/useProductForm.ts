import { useFormField } from "./useFormField";
import { rules } from "../utils/rules";
import { useState } from "react";
import type { Product } from "../utils/types";

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
        return {
            id: editingId ?? crypto.randomUUID(),
            description: description.value,
            freightType: freightType.value,
            isClientCap: isClientCap.value,
            asphaltBinderContent: asphaltBinderContent.value,
            unit: unit.value,
            quantity: Number(amount.value),
            price: Number(price.value)
        };
    };

    const setProdutctToEdit = (p: Product) => {
        description.setValue(p.description);
        freightType.setValue(p.freightType);
        isClientCap.setValue(p.isClientCap);
        asphaltBinderContent.setValue(p.asphaltBinderContent ?? "");
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
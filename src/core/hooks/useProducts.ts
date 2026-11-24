import { useState } from "react";
import type { Product } from "../utils/types";

export type ProductsState = ReturnType<typeof useProducts>;

function reorderProducts(
    array: Product[],
    index: number,
    offset: number
): Product[] {
    if (index < 0 || index >= array.length|| (offset !== -1 && offset !== 1)) return array;
    const targetIndex = index + offset;
    if (targetIndex < 0 || targetIndex >= array.length) return array;

    const newArray = [...array];
    [newArray[index], newArray[targetIndex]] = [newArray[targetIndex], newArray[index]];
    return newArray;
}

export function useProducts(saved?: Product[]) {
    const [products, setProducts] = useState<Product[]>(saved ?? []);

    return {
        products,
        insertProduct: (newProduct: Product) =>
            setProducts((prev) => [...prev, newProduct]),
        updateProduct: (id: string, updated: Product) =>
            setProducts((prev) => prev.map((p) => (p.id === id ? updated : p))),
        removeProduct: (index: number) => 
            setProducts((prev) => prev.filter((_, i) => i !== index)),
        reorderProducts: (index: number, offset: number) =>
            setProducts((prev) => reorderProducts(prev, index, offset)),
        replaceAll: (products: Product[]) => setProducts(products),
        getFormated: (p: Product) => {
            let text = `${p.description} - ${p.freightType}`;
            if (p.isClientCap) text += ` - CAP por conta do cliente - ${p.asphaltBinderContent}%`;
            return text;
        },
        getSubtotal: (p: Product) => p.quantity * p.price,
        getTotal: () => products.reduce((sum, p) =>
            sum + (p.price * p.quantity), 0),
        reset: () => setProducts([])
    };
}
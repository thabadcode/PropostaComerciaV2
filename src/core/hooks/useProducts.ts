import { useState } from "react";

export type ProductsState = ReturnType<typeof useProducts>;
export interface Product {
    id: string;
    description: string;
    unit: string;
    quantity: number;
    price: number;
}

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

        getTotal: () => products.reduce((sum, p) =>
            sum + (p.price * p.quantity), 0),
        reset: () => setProducts([])
    };
}
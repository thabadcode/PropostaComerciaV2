const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const shortDateFormatter = new Intl.DateTimeFormat("pt-BR");
const quantityFormatter = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2
});
const moneyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export const formatter = {
    longDate: (value: Date): string => 
        Number.isNaN(value.getTime()) ? "" : longDateFormatter.format(value),
    shortDate: (value: Date): string => 
        Number.isNaN(value.getTime()) ? "" : shortDateFormatter.format(value),
    proposalNumber: (value: string) => {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "000";
        return digits.slice(-3).padStart(3, "0");
    },
    cnpj: (value: string): string =>  {
        const d = value.replace(/\D/g, "").slice(0, 14);
        const parts = [
            d.slice(0, 2),
            d.slice(2, 5),
            d.slice(5, 8),
            d.slice(8, 12),
            d.slice(12, 14),
        ];
        let out = parts[0];
        if (parts[1]) out += `.${parts[1]}`;
        if (parts[2]) out += `.${parts[2]}`;
        if (parts[3]) out += `/${parts[3]}`;
        if (parts[4]) out += `-${parts[4]}`;
        return out;
    },
    quantity: (value: number): string => quantityFormatter.format(value),
    money: (value: number): string => moneyFormatter.format(value)
};
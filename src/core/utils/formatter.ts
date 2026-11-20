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
    cnpj: (value: string): string =>  {
        const digits = value.replace(/\D/g, "");
        if (digits.length !== 14) return value;
        return `${digits.substring(0, 2)}.${digits.substring(2, 5)}.${digits.substring(5, 8)}/${digits.substring(8, 12)}-${digits.substring(12, 14)}`;
    },
    quantity: (value: number): string => quantityFormatter.format(value),
    money: (value: number): string => moneyFormatter.format(value)
};
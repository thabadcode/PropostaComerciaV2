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
    longDate: (value: Date): string => longDateFormatter.format(value),
    shortDate: (value: Date): string => shortDateFormatter.format(value),
    quantity: (value: number): string => quantityFormatter.format(value),
    money: (value: number): string => moneyFormatter.format(value)
};
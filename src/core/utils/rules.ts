export const rules = {
    required: (value: string): string | null =>
        value.trim() === ""? "Campo obrigatório" : null,

    proposalNumber: (value: string): string | null => {
        if (value.trim()) return "Campo obrigatório";
        const number = Number(value);
        if (number < 1 || number > 999) return "Informe um número (1 a 999)"
        return null;
    },

    cnpj: (value: string): string | null => {
        const clean = value.replace(/\D/g, "");
        const isValid =
            clean.length === 14 &&
            !/^(\d)\1+$/.test(clean) &&
            validateCheckDigit(clean, 12) &&
            validateCheckDigit(clean, 13)
        
        return isValid? null : "Informe um CNPJ válido";
    },

    binderContent: (value: string): string | null => {
        if (value.trim() === "") return "Campo obrigatório";
        const number = Number(value);
        if (Number.isNaN(number)) return "Digite apenas números";
        if (number < 4.0 || number > 9.0) return "Informe um valor entre 4.0 e 9.0";
        return null;
    },
    
    positiveNumber: (value: string): string | null => {
        if (value.trim() === "") return "Campo obrigatório";
        const number = Number(value);
        if (Number.isNaN(number)) return "Digite apenas números";
        return number > 0 ? null : "Digite um valor maior que 0";
    }
};

function validateCheckDigit(
    cleanCnpj: string,
    length: number,
): boolean {
    let sum = 0;
    let weight = length - 7;

    for (let i = 0; i < length; i++) {
        sum += parseInt(cleanCnpj.charAt(i)) * weight--;
        if (weight  < 2) weight  = 9;
    }

    const mod = sum % 11;
    const result = mod < 2 ? 0 : 11 - mod;
    
    return result === parseInt(cleanCnpj.charAt(length));
}
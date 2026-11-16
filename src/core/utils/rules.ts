export const rules = {
    required: (value: string): boolean => {
        const clean = value.trim();
        return clean !== '';
    },
    cnpj: (value: string): boolean => {
        const clean = value.replace(/\D/g, "");
        if (clean.length !== 14) return false;
        if (/^(\d)\1+$/.test(clean)) return false;

        return (validateCheckDigit(clean, 12) && validateCheckDigit(clean, 13));
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
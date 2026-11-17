import { describe, it, expect } from 'vitest';
import { rules } from '../src/core/utils/rules';

describe('rules.required - Validação de campo obrigatório', () => {
    it('deve retornar null quando o campo não está em branco', () => {
        expect(rules.required("EMPRESA TESTE LTDA")).toBe(null);
    });

    it.each([
        [''], ['   ']
    ])('deve retornar mensagem de erro quando o campo está em branco', (blankData) => {
        expect(rules.required(blankData)).toBe("Campo obrigatório");
    });
});

describe('rules.cnpj - Validação de CNPJ', () => {
    describe('Quando o CNPJ é válido', () => {
        it('deve retornar null para CNPJ válido com máscara', () => {
            expect(rules.cnpj('11.888.584/0001-08')).toBe(null);
        });

        it('deve retornar null para CNPJ válido sem máscara', () => {
            expect(rules.cnpj('11888584000108')).toBe(null);
        });
    });

    describe('Quando o formato ou tamanho está incorreto', () => {
        it('deve retornar mensagem de erro quando o cnpj não tiver 14 dígitos', () => {
            expect(rules.cnpj('1234567890123')).toBe("Informe um CNPJ válido");
            expect(rules.cnpj('123456789012345')).toBe("Informe um CNPJ válido");
            expect(rules.cnpj('')).toBe("Informe um CNPJ válido");
        });

        it('deve retornar mensagem de erro para sequências de dígitos repetidos', () => {
            expect(rules.cnpj('00.000.000/0000-00')).toBe("Informe um CNPJ válido");
            expect(rules.cnpj('11.111.111/1111-11')).toBe("Informe um CNPJ válido");
            expect(rules.cnpj('99.999.999/9999-99')).toBe("Informe um CNPJ válido");
        });
    });

    describe('Quando os dígitos verificadores falham na matemática', () => {
        it.each([
            ['12.345.678/0001-90'],
            ['11.444.777/0001-88'],
            ['55.444.333/0001-22'],
        ])('deve retornar mensagem de erro para o CNPJ inválido: %s', (invalidCnpj) => {
            expect(rules.cnpj(invalidCnpj)).toBe("Informe um CNPJ válido");
        });
    });
});

describe('rules.binderContent - Validação do teor de CAP', () => {
    it('deve retornar null quando o valor é válido', () => {
        expect(rules.binderContent("5.1")).toBe(null);
    });

    it.each([
        [''], ['  '],
    ])('deve retornar mensagem de erro quando o campo está em branco', (blankData) => {
        expect(rules.binderContent(blankData)).toBe("Campo obrigatório");
    });

    it('deve retornar mensagem de erro quando o valor não é um número', () => {
        expect(rules.binderContent("abc")).toBe("Digite apenas números");
    });

    it.each([
        ['3'],['10']
    ])('deve retornar mensagem de erro quando o valor está fora do interválo', (invalidData) => {
        expect(rules.binderContent(invalidData)).toBe("Informe um valor entre 4.0 e 9.0");
    });
});

describe('rules.positiveNumber - Validação de número positivo', () => {
    it('deve retornar null quando o valor é válido', () => {
        expect(rules.positiveNumber("500")).toBe(null);
    });

    it.each([
        [''], ['  '],
    ])('deve retornar mensagem de erro quando o campo está em branco', (blankData) => {
        expect(rules.positiveNumber(blankData)).toBe("Campo obrigatório");
    });

    it('deve retornar mensagem de erro quando o valor não é um número', () => {
        expect(rules.positiveNumber("abc")).toBe("Digite apenas números");
    });

    it.each([
        ['0'],['-500']
    ])('deve retornar mensagem de erro quando o valor é menor ou igual a 0', (invalidData) => {
        expect(rules.positiveNumber(invalidData)).toBe("Digite um valor maior que 0");
    });
});
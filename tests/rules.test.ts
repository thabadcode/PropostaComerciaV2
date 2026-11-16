import { describe, it, expect } from 'vitest';
import { rules } from '../src/core/utils/rules';

describe('rules.cnpj - Validação de CNPJ', () => {
    describe('Quando o CNPJ é válido', () => {
        it('deve retornar true para CNPJ válido com máscara', () => {
            expect(rules.cnpj('11.888.584/0001-08')).toBe(true);
        });

        it('deve retornar true para CNPJ válido sem máscara', () => {
            expect(rules.cnpj('11888584000108')).toBe(true);
        });
    });

    describe('Quando o formato ou tamanho está incorreto', () => {
        it('deve retornar false quando o cnpj não tiver 14 dígitos', () => {
            expect(rules.cnpj('1234567890123')).toBe(false);
            expect(rules.cnpj('123456789012345')).toBe(false);
            expect(rules.cnpj('')).toBe(false);
        });

        it('deve retornar false para sequências de dígitos repetidos', () => {
            expect(rules.cnpj('00.000.000/0000-00')).toBe(false);
            expect(rules.cnpj('11.111.111/1111-11')).toBe(false);
            expect(rules.cnpj('99.999.999/9999-99')).toBe(false);
        });
    });

    describe('Quando os dígitos verificadores falham na matemática', () => {
        it.each([
            ['12.345.678/0001-90'],
            ['11.444.777/0001-88'],
            ['55.444.333/0001-22'],
        ])('deve retornar false para o CNPJ inválido: %s', (invalidCnpj) => {
            expect(rules.cnpj(invalidCnpj)).toBe(false);
        });
    });
});
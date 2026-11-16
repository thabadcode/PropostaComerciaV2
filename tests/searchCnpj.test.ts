import { describe, it, expect, vi } from 'vitest';
import { searchCnpj } from '../src/core/utils/searchCnpj';

describe('searchCnpj', () => {
    it('deve retornar os dados da empresa com sucesso quando o CNPJ for válido', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({
                razao_social: 'EMPRESA TESTE LTDA',
                descricao_situacao_cadastral: 'ATIVA'
            })
        });

        const result = await searchCnpj('00.000.000/0001-91');

        expect(result.hasError).toBe(false);
        expect(result.companyName).toBe('EMPRESA TESTE LTDA');
        expect(result.isActive).toBe(true);
    });

    it('deve retornar hasError: true quando a API falhar (ex: 404)', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found'
        });

        const result = await searchCnpj('11.111.111/0001-11');

        expect(result.hasError).toBe(true);
        expect(result.companyName).toBe('');
        expect(result.errorMsg).toContain('404');
    });

    it('deve lançar erro quando houver falha de conexão com a API', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch'));
       
        const result = await searchCnpj('11.111.111/0001-11');

        expect(result.hasError).toBe(true);
        expect(result.companyName).toBe('');
        expect(result.errorMsg).toContain('Failed to fetch');
    });
});
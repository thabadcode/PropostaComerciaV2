interface ResultCnpj {
    companyName: string;
    isActive: boolean;
    hasError: boolean;
    errorMsg?: string;
}

export const searchCnpj = (cnpj: string) => {
    const cnpjClear = cnpj.replace(/\D/g, '');
    return searchCnpjByApi(cnpjClear);
};

async function searchCnpjByApi(cnpj: string): Promise<ResultCnpj> {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);

        if (!response.ok && response.status !== 304) {
            return {
                companyName: '',
                isActive: false,
                hasError: true,
                errorMsg: `Erro ao buscar o CNPJ: Status (${response.status}) ${response.statusText}`
            };
        }

        const data = await response.json() as {
            razao_social: string,
            descricao_situacao_cadastral: string
        }

        const companyName: string = data.razao_social;
        const isActive: boolean = data.descricao_situacao_cadastral === "ATIVA";

        return {
            companyName,
            isActive,
            hasError: false
        };        
    } catch (error) {
        return {
            companyName: "",
             isActive: false,
             hasError: true,
             errorMsg: (error instanceof Error ?
                error.message
                :
                'Erro de conexão com a rede ou serviço fora do ar. Tente novamente mais tarde.'
            )
        };
    };
}
const GerarNotaCarioca = require('../lib/services/GerarNotaCarioca');
const getPathFromRoot = require('../lib/utils/getPathFromRoot');
const SoapHandler = require('../lib/utils/SoapHandler');

const rps = {
    IdentificacaoRps: {
        Numero: '1',
        Serie: 'ABC',
        Tipo: '1'
        // 1 - RPS
        // 2 – Nota Fiscal Conjugada (Mista)
        // 3 – Cupom
    },
    DataEmissao: '2024-05-01',
    NaturezaOperacao: '1',
    // 1 – Tributação no município
    // 2 - Tributação fora do município
    // 3 - Isenção
    // 4 - Imune
    // 5 – Exigibilidade suspensa por decisão judicial
    // 6 – Exigibilidade suspensa por procedimento administrativo
    RegimeEspecialTributacao: '3',  // opcional
    // 1 – Microempresa municipal
    // 2 - Estimativa
    // 3 – Sociedade de profissionais
    // 4 – Cooperativa
    // 5 – MEI – Simples Nacional
    // 6 – ME EPP – Simples Nacional
    OptanteSimplesNacional: '1', // 1 - Sim 2 - Não
    IncentivadorCultural: '2', // 1 - Sim 2 - Não
    Status: '1', // 1 – Normal  2 – Cancelado
    Servico: {
        Valores: {
            ValorServicos: '100.00',
            ValorDeducoes: '0.00', // opcional
            ValorPis: '0.00', // opcional
            ValorCofins: '0.00', // opcional
            ValorInss: '0.00', // opcional
            ValorIr: '0.00', // opcional
            ValorCsll: '0.00', // opcional
            IssRetido: '2.00', // 1 para ISS Retido - 2 para ISS não Retido,
            ValorIss: '0.00', // opcional
            OutrasRetencoes: '0.00', // opcional
            Aliquota: '0.00', // opcional
            DescontoIncondicionado: '0.00', // opcional
            DescontoCondicionado: '0.00', // opcional
        },
        ItemListaServico: '1.07', // First 4 digits - https://notacarioca.rio.gov.br/files/leis/Resolucao_2617_2010_anexo2.pdf
        CodigoTributacaoMunicipio: '522310000', // 6 digits - https://notacarioca.rio.gov.br/files/leis/Resolucao_2617_2010_anexo2.pdf
        Discriminacao: 'Teste de emissão de nota fiscal',
        CodigoMunicipio: '3304557',
    },
    Prestador: {
        Cnpj: '12123736000136',
        InscricaoMunicipal: '12345678' // opcional
    },
    Tomador: {
        IdentificacaoTomador: { // opcional
            CpfCnpj: {
                Cnpj: '98051666000173'
            }
        },
        RazaoSocial: 'Tomador de Teste', // opcional
        Endereco: { // opcional
            Endereco: 'Rua do Tomador',
            Numero: '123',
            Complemento: 'Sala 101',
            Bairro: 'Centro',
            CodigoMunicipio: '3304557',
            Uf: 'RJ',
            Cep: '20000000'
        },
        IntermediarioServico: { // opcional
            RazaoSocial: 'Intermediario de Teste',
            CpfCnpj: {
                Cnpj: '98051666000173'
            },
            InscricaoMunicipal: '12345678'
        },
        ConstrucaoCivil: { // opcional
            CodigoObra: '123',
            Art: '123'
        },
    }
};

const certPath = getPathFromRoot('certificado-teste.pfx');

const cnc = new GerarNotaCarioca('dev', rps);

const sh = new SoapHandler({ certPath: certPath, certPass: '123456' });

sh.send(cnc).then((response) => {
    console.log('sucesso: ', response);
}).catch((error) => {
    console.error('erro: ', error);
});
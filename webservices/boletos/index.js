const { Bancos, Boletos, streamToPromise} = require('./lib/index');
const fs = require('fs');

const conteudo = {
  banco: new Bancos.Bradesco(),
  pagador: {
    nome: 'Gabriel Frantz',
    RegistroNacional: '12345678',
    endereco: {
      logradouro: 'Rua Brígida Fagundes, 81',
      bairro: 'Morsh',
      cidade: 'Venâncio Aires',
      estadoUF: 'RS',
      cep: '95800-000'
    }
  },
  instrucoes: ['Após o vencimento, multa de 2%'],
  beneficiario: {
    nome: 'Educare - Plataforma Virtual de Educacao LTDA',
    cnpj: '11111111000191',
    dadosBancarios: {
      carteira: '11',
      agencia: '1111',
      agenciaDigito: '1',
      conta: '1111111',
      contaDigito: '0',
      nossoNumero: '00000000011',
      nossoNumeroDigito: '1'
    },
    endereco: {
      logradouro: 'Rua Tiradentes, 1682',
      bairro: 'Centro',
      cidade: 'Venâncio Aires',
      estadoUF: 'RS',
      cep: '95800-000'
    }
  },
  boleto: {
    numeroDocumento: '1001',
    especieDocumento: 'DM',
    valor: '100.00',
    datas: {
      vencimento: '07-20-2021',
      processamento: '06-20-2021',
      documentos: '06-20-2021'
    }
  }
};

const novoBoleto = new Boletos(conteudo);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async ({ stream }) => {	
  await streamToPromise(stream);
}).catch((error) => {
  return error;
});

//padrão do pdf certificado
console.log('Waking up fellas')
const express = require("express");
const Promise = require('bluebird');
const bodyParse = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const pdf = Promise.promisifyAll(require('html-pdf'));
const app = express();
const port = 3003;
app.use(morgan('combined'))
app.use(bodyParse.json())
app.use(cors())

//já veio com o padrão boleto
const { Bancos, Boletos} = require('./lib/index');
const fs = require('fs');
const Boleto = require('./lib/utils/functions/boletoUtils');
const BoletoStringify = require('./lib/stringify/boletoStringify');

module.exports = class Boletos {
  constructor({ banco, pagador, boleto, beneficiario, instrucoes }) {
    this.banco = banco;
    this.pagador = pagador;
    this.boleto = boleto;
    this.beneficiario = beneficiario;
    this.instrucoes = instrucoes;
    this.boletoInfo;
  }

  gerarBoleto() {
    const dataInstance = Boleto.Datas;
    const { datas, valor, especieDocumento, numeroDocumento } = this.boleto;

    this.boletoInfo = Boleto.Boleto.novoBoleto()
      .comDatas(dataInstance.novasDatas()
        .comVencimento(datas.vencimento)
        .comProcessamento(datas.processamento)
        .comDocumento(datas.documentos))
      .comBeneficiario(BoletoStringify.createBeneficiario(this.beneficiario))
      .comPagador(BoletoStringify.createPagador(this.pagador))
      .comBanco(this.banco)
      .comValorBoleto(parseFloat(valor).toFixed(2))
      .comNumeroDoDocumento(numeroDocumento)
      .comEspecieDocumento(especieDocumento)
      .comInstrucoes(BoletoStringify.createInstrucoes(this.instrucoes));
  }

  pdfFile(dir = './tmp', filename='boleto') {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const stream = fs.createWriteStream(`${dir}/${filename}.pdf`);

    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }

  pdfStream(stream) {
    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }
};

const geraPdf = async (req) => {
  const conteudo = {
    banco: new Bancos.Bradesco(),
    pagador: {
      nome: req.body.nom_pessoa,
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
      valor: req.body.vlr_pgto,
      datas: {
        vencimento: req.body.vencimento,
        processamento: req.body.processamento,
        documentos: req.body.documentos
      }
    },
  }
  const novoBoleto = new Boletos(conteudo);
  novoBoleto.gerarBoleto();
  novoBoleto.pdfFile().then(async ({ stream }) => {	
    await streamToPromise(stream);
  }).catch((error) => {
    return error;
  });
};

/*
//padrão do pdf certificado
let createResult = pdf.create(conteudo, { format: 'A4' });
let pdfToBuffer = Promise.promisify(createResult.__proto__.toBuffer, { context: createResult });
let bufferResult = await pdfToBuffer();
return bufferResult;

app.post("/gerarBoleto", async (req, res) => {
  try {
    console.log("chegou")
    let bufferResult = await geraPdf(req);

    res.set('Content-Type', 'application/pdf');
    res.send(bufferResult);
  } catch (err) {
    res.status(500).send({
      error: 'Ocorreu um erro ao gerar o pdf do boleto'
    })
  }
});
*/

app.listen(port, () => console.log(`app listening on port ${port}`));

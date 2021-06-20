console.log('Waking up fellas')
const express = require("express");
const bodyParse = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express();
app.use(bodyParse.json())
const port = 3003;
const { Bancos, Boletos, streamToPromise} = require('./lib/index')
const fs = require('fs');

app.post('/gerarBoleto', async (req, res) => {
  try {
    console.log(req.body)
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
          vencimento: '07-20-2021',
          processamento: '06-20-2021',
          documentos: '06-20-2021'
        }
      }
    };

    const novoBoleto = new Boletos(conteudo)
    novoBoleto.gerarBoleto()

    novoBoleto.pdfFile().then(async ({ stream }) => {	
      await streamToPromise(stream)
    }).catch((error) => {
      return error
    });
    res.status(200).send('Gerado')
  } catch (error) {
    res.status(500).send({
      error: 'Ocorreu um erro ao gerar boleto ' + error
    })
  }
})

app.listen(port, () => console.log(`app listening on port ${port}`));
const { UsuarioAssinatura } = require('../models')
const { Pagamento } = require('../models')
const { FormaPagamento } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');
const SendMail = require('../core/SendMail');
const fetch = require('node-fetch');

module.exports = {
  async geraBoleto(req, res) {
    console.log("UsuarioAssinatura:" + req.params.usuarioAssinaturaId)
    console.log("Pagamento:" + req.params.pagamentoId)
    console.log("FormaPagamento:" + req.params.formaPagamentoId)
    try {
      console.log("CHEGOU BOLETO")
      var usuarioAssinatura = await UsuarioAssinatura.findOne({
        where: {
          id: req.params.usuarioAssinaturaId
        }
      })

      var pagamento = await Pagamento.findOne({
        where: {
          id: req.params.pagamentoId
        }
      })

      var formaPagamento = await FormaPagamento.findOne({
        where: {
          id: req.params.formaPagamentoId
        }
      })
      console.log("VERIFICOU OS TRÊS")
      if (!usuarioAssinatura) {
        return res.status(403).send({
          error: 'Assinatura do usuário não encontrada. Não é permitido gerar o boleto!'
        })
      }
      if (!pagamento) {
        return res.status(403).send({
          error: 'Pagamento não encontrado. Não é permitido gerar o boleto!'
        })
      }
      if (!formaPagamento) {
        return res.status(403).send({
          error: 'Forma de pagamento não encontrada. Não é permitido gerar o boleto!'
        })
      }
      console.log("ANTES EMAIL BOLETO")
      await SendMail.Enviar(user.email, 'Boleto gerado com sucesso!');
      console.log("EMAIL BOLETO")
      function adicionaZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
      }
      const dataAtual = new Date()
      const dataAtualFormatada = (adicionaZero(dataAtual.getDate().toString()) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear())
      const dataAtualFormatadaVencimento = ((adicionaZero(dataAtual.getDate()).toString()) + "/" + (adicionaZero(dataAtual.getMonth()+2).toString()) + "/" + dataAtual.getFullYear())
      const boleto = {
        vencimento: dataAtualFormatadaVencimento,
        processamento: dataAtualFormatada,
        documentos: dataAtualFormatada,
        nom_pessoa: user.nom_pessoa,
        vlr_pgto: pagamento.vlr_pgto
      }
      console.log("BEFORE FETCH BOLETO")
      const response = await fetch('http://localhost:3003/gerarBoleto', {
        method: 'POST',
        body: JSON.stringify(boleto),
        headers: { 'Content-Type': 'application/json' },
      });
      const buffer = await response.buffer();
      console.log(buffer)

      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    } catch (err) {
      LogCreate.post(req.headers.userid, '/geraBoleto', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao gerar o boleto' + err
      })
    }
  }
}

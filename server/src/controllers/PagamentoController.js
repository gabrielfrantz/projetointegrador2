const { UsuarioAssinatura } = require('../models')
const { Pagamento } = require('../models')
const { User } = require('../models')
const { Assinatura } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate')
const SendMail = require('../core/SendMail')
const SendMailAnexo = require('../core/SendMailAnexo')
const fetch = require('node-fetch')
const fs = require('fs')

module.exports = {
  async pagarCartao(req, res) {
    console.log("Usuario:" + req.params.userId)
    console.log("Assinatura:" + req.params.assinaturaId)
    try {
      const assinatura = await Assinatura.findOne({
        where: {
          id: req.params.assinaturaId
        }
      })
      if (!assinatura) {
        return res.status(403).send({
          error: 'Assinatura não encontrada. Não foi possível finalizar o pagamento!'
        })
      }
      const user = await User.findOne({
        where: {
          id: req.params.userId
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Usuário não encontrado. Não foi possível finalizar o pagamento!'
        })
      }
      await UsuarioAssinatura.destroy({
        where: {
          id_user: req.params.userId
        }
      })
      const newAssinatura = {
        id_user: req.params.userId,
        id_assinatura: req.params.assinaturaId
      }
      console.log(newAssinatura)
      const usuarioAssinatura = await UsuarioAssinatura.create(newAssinatura)
      await AuditCreate.createAudit(null, usuarioAssinatura, "usuarioAssinatura", "CREATE", req.headers.userid, {})
      const pagamento = {
        id_assinatura_usuario: usuarioAssinatura.id,
        id_forma_pgto: 2,
        vlr_pgto: assinatura.vlr_assinatura
      }
      const pgto = await Pagamento.create(pagamento)
      await AuditCreate.createAudit(null, pagamento, "pagamento", "CREATE", req.headers.userid, {})


      await SendMail.Enviar(user.email, 'Pagamento assinatura!', 'Pagamento da assinatura com cartão efetuado com sucesso!');
      res.send(pgto)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/pagarCartaoPagamento', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao gerar o boleto' + err
      })
    }
  },
  async pagarBoleto(req, res) {
    console.log("Usuario:" + req.params.userId)
    console.log("Assinatura:" + req.params.assinaturaId)
    try {
      const assinatura = await Assinatura.findOne({
        where: {
          id: req.params.assinaturaId
        }
      })
      if (!assinatura) {
        return res.status(403).send({
          error: 'Assinatura não encontrada. Não foi possível finalizar o pagamento!'
        })
      }
      const user = await User.findOne({
        where: {
          id: req.params.userId
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Usuário não encontrado. Não foi possível finalizar o pagamento!'
        })
      }
      await UsuarioAssinatura.destroy({
        where: {
          id_user: req.params.userId
        }
      })
      const newAssinatura = {
        id_user: req.params.userId,
        id_assinatura: req.params.assinaturaId
      }
      console.log(newAssinatura)
      const usuarioAssinatura = await UsuarioAssinatura.create(newAssinatura)
      await AuditCreate.createAudit(null, usuarioAssinatura, "usuarioAssinatura", "CREATE", req.headers.userid, {})
      const pagamento = {
        id_assinatura_usuario: usuarioAssinatura.id,
        id_forma_pgto: 1,
        vlr_pgto: assinatura.vlr_assinatura
      }
      const pgto = await Pagamento.create(pagamento)
      await AuditCreate.createAudit(null, pagamento, "pagamento", "CREATE", req.headers.userid, {})

      function adicionaZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
      }
      const dataAtual = new Date()
      const dataAtualFormatada = ((adicionaZero(dataAtual.getMonth()+1).toString()) + "-" + adicionaZero(dataAtual.getDate().toString()) + "-" + dataAtual.getFullYear())
      const dataAtualFormatadaVencimento = ((adicionaZero(dataAtual.getMonth()+2).toString()) + "-" + adicionaZero(dataAtual.getDate().toString()) + "-" + dataAtual.getFullYear())
      const boleto = {
        vencimento: dataAtualFormatadaVencimento,
        processamento: dataAtualFormatada,
        documentos: dataAtualFormatada,
        nom_pessoa: user.nom_pessoa,
        vlr_pgto: pagamento.vlr_pgto
      }
      console.log('vencimento: '+dataAtualFormatadaVencimento)
      console.log('processamento: '+dataAtualFormatada)
      const response = await fetch('http://localhost:3003/gerarBoleto', {
        method: 'POST',
        body: JSON.stringify(boleto),
        headers: { 'Content-Type': 'application/json' },
      })

      await SendMailAnexo.Enviar(user.email, 'Pagamento assinatura!', 'Pagamento da assinatura com boleto efetuado com sucesso!', 'boleto.pdf', '../boletos/tmp/boleto.pdf')

      await new Promise(r => setTimeout(r, 2000));

     // fs.unlink('../webservices/boletos/tmp/boleto.pdf', function (err){
        //if (err) throw err;
       // console.log('Arquivo deletado!');
      //})
      
      res.send(pgto)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/geraBoleto', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao gerar o boleto' + err
      })
    }
  }
}

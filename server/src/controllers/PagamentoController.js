const { UsuarioAssinatura } = require('../models')
const { Pagamento } = require('../models')
const { User } = require('../models')
const { Assinatura } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate')
const SendMail = require('../core/SendMail')
const fetch = require('node-fetch')

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


      await SendMail.Enviar(user.email, 'Pagamento assinatura!', 'Pagamento da assinatura com cartão efetuado com sucesso!');
      res.send(pgto)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/pagarCartaoPagamento', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao gerar o boleto' + err
      })
    }
  }
}

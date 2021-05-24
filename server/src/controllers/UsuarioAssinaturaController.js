const { UsuarioAssinatura } = require('../models')
const { User } = require('../models')
const { Assinatura } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate')

module.exports = {
  async view (req, res) {
    try {
      UsuarioAssinatura.belongsTo(User, { foreignKey: 'id_user' })
      User.hasMany(UsuarioAssinatura, { foreignKey: 'id_user' })
      const usuarios = await UsuarioAssinatura.findAll({
        include: [{
          model: User, 
          required: false
        }]        
      })
      res.send(usuarios)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewUsuarioAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de assinatura dos usuários'
      })
    }
  },
  async show (req, res) {
    try {
      const usuarioAssinatura = await UsuarioAssinatura.findOne({
        where: {
          id_user: req.params.userId
        }
      })
      res.send(usuarioAssinatura)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showUsuarioAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a assinatura do usuario'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      await UsuarioAssinatura.destroy({
        where: {
          id_user: req.body.id_user
        }
      })
      const usuarioAssinatura = await UsuarioAssinatura.create(req.body)
      await AuditCreate.createAudit(null, usuarioAssinatura, "usuarioAssinatura", "CREATE", req.headers.userid, {});
      res.send(usuarioAssinatura)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postUsuarioAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar assinatura do usuário'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log('delete')
      const prevUsuarioAssinatura = await UsuarioAssinatura.findOne({
        where: {
          id_user: req.params.userId,
          id_assinatura: req.params.assinaturaId
        }
      })
      console.log('finde')
      await UsuarioAssinatura.destroy({
        where: {
          id_user: req.params.userId,
          id_assinatura: req.params.assinaturaId
        }
      })
      console.log('deletou')
      await AuditCreate.createAudit(prevUsuarioAssinatura, null, "usuarioAssinatura", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteUsuarioAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar assinatura do usuário'
      })
    }
  }
}
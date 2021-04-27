const { Assinatura } = require('../models')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');

module.exports = {
  async view (req, res) {
    try {
      const assinaturas = await Assinatura.findAll({})
      res.send(assinaturas)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de assinaturas'
      })
    }
  },
  async post (req, res) {
    try {
      const assinatura = await Assinatura.create(req.body)
      await AuditCreate.createAudit(null, assinatura, "assinatura", "CREATE", req.headers.userid, {});
      res.send(assinatura)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar assinatura'
      })
    }
  },
  async put (req, res) {
    try {
      const prevAssinatura = await Assinatura.findOne({
        where: {
          id: req.params.assinaturaId
        }
      })
      const assinatura = await Assinatura.update(req.body, {
        where: {
          id: req.params.assinaturaId
        }
      })
      await AuditCreate.createAudit(prevAssinatura, assinatura, "assinatura", "UPDATE", req.headers.userid, {});
      res.send(assinatura)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/putAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar assinatura'
      })
    }
  },
  async delete (req, res) {
    try {
      const prevAssinatura = await Assinatura.findOne({
        where: {
          id: req.params.assinaturaId
        }
      })
      await Assinatura.destroy({
        where: {
          id: req.params.assinaturaId
        }
      })
      await AuditCreate.createAudit(prevAssinatura, null, "assinatura", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar assinatura'
      })
    }
  },
  async show (req, res) {
    try {
      const assinatura = await Assinatura.findOne({
        where: {
          id: req.params.assinaturaId
        }
      })
      res.send(assinatura)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a assinatura'
      })
    }
  }
}

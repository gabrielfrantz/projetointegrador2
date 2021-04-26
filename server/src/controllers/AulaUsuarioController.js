const { AulaUsuario } = require('../models')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');


module.exports = {
  async view (req, res) {
    try {
      const aulas = await AulaUsuario.findAll({
        attributes: ['id_aula', [AulaUsuario.sequelize.fn('AVG', AulaUsuario.sequelize.col('qtd_estrela')), 'media_estrela']],
        group: ['id_aula']
      })
      res.send(aulas)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de aulas'
      })
    }
  },
  async upsert (req, res) {
    try {
      console.log("upsert")
      const prevAula = await AulaUsuario.findOne({
        where: {
          id_aula: req.body.id_aula,
          id_user: req.body.id_user
        }
      })
      var aulaUsuario = null
      if (prevAula) {
        aulaUsuario = await AulaUsuario.update(req.body, {
          individualHooks: true,
          where: {
            id_aula: req.body.id_aula,
            id_user: req.body.id_user
          }
        })
        await AuditCreate.createAudit(prevAula, aulaUsuario, "aulaUsuario", "UPDATE", req.headers.userid, {});
      } else {
        aulaUsuario = await AulaUsuario.create(req.body)
        await AuditCreate.createAudit(prevAula, aulaUsuario, "aulaUsuario", "CREATE", req.headers.userid, {});
      }
      res.send(aulaUsuario)
    } catch (err) {
      console.log(err)
      LogCreate.post(req.headers.userid, '/upsertAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar aula usuário'
      })
    }
  },
  async delete (req, res) {
    try {
      const prevAula = await AulaUsuario.findOne({
        where: {
          id_aula: req.params.aulaId,
          id_user: req.params.userId
        }
      })
      await AulaUsuario.destroy({
        where: {
          id_aula: req.params.aulaId,
          id_user: req.params.userId
        }
      })
      await AuditCreate.createAudit(prevAula, null, "aulaUsuario", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar aula'
      })
    }
  },
  async show (req, res) {
    try {
      const aulaUsuario = await AulaUsuario.findOne({
        attributes: ['id_aula', 'id_user', 'ind_concluido', [AulaUsuario.sequelize.fn('AVG', AulaUsuario.sequelize.col('qtd_estrela')), 'media_estrela']],
        group: ['id_aula'],
        where: {
          id_aula: req.params.aulaId,
          id_user: req.params.userId
        }
      })
      res.send(aulaUsuario)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a aula'
      })
    }
  },
  async showMedia (req, res) {
    try {
      const aulaUsuario = await AulaUsuario.findOne({
        attributes: ['id_aula', [AulaUsuario.sequelize.fn('AVG', AulaUsuario.sequelize.col('qtd_estrela')), 'media_estrela']],
        group: ['id_aula'],
        where: {
          id_aula: req.params.aulaId
        }
      })
      res.send(aulaUsuario)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showMediaAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a aula'
      })
    }
  }
}
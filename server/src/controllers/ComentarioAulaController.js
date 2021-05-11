const { ComentarioAula } = require('../models')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate')

module.exports = {
  async view (req, res) {
    try {
      const comentarios = await ComentarioAula.findAll({
        where: {
          id_aula: req.params.aulaId
        }
      })
      res.send(comentarios)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewComentarioAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de comentarios'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const comentario = await ComentarioAula.create(req.body)
      await AuditCreate.createAudit(null, comentario, "comentarioAula", "CREATE", req.headers.userid, {});
      res.send(comentario)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postComentario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar comentário'
      })
    }
  },
  async delete (req, res) {
    try {
      const prevAula = await ComentarioAula.findOne({
        where: {
          id_aula: req.params.aulaId,
          id_user: req.params.userId
        }
      })
      await ComentarioAula.destroy({
        where: {
          id_aula: req.params.aulaId,
          id_user: req.params.userId
        }
      })
      await AuditCreate.createAudit(prevAula, null, "comentarioAula", "DELETE", req.headers.userid, {});
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
      const comentario = await ComentarioAula.findOne({
        where: {
          id_aula: req.params.aulaId,
          id_user: req.params.userId
        }
      })
      res.send(comentario)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a aula'
      })
    }
  }
}
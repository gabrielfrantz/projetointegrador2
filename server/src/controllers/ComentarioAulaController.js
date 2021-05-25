const { ComentarioAula } = require('../models')
const { User } = require('../models')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate')

module.exports = {
  async view (req, res) {
    try {
      ComentarioAula.belongsTo(User, { foreignKey: 'id_user' })
      const comentarios = await ComentarioAula.findAll({
        order: [['createdAt', 'asc']],
        where: {
          id_aula: req.params.aulaId
        },
        include: [{
          model: User, 
          attributes: ['id', 'email', 'nom_pessoa'],
          required: false
        }]
      })
      res.send(comentarios)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewComentarioAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de comentários'
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
  async put (req, res) {
    try {
      console.log('edit')
      const prevCommentario = await ComentarioAula.findOne({
        where: {
          id: req.params.comentarioId
        }
      })
      const comentario = await ComentarioAula.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.comentarioId
        }
      })
      await AuditCreate.createAudit(prevCommentario, comentario, "comentarioAula", "UPDATE", req.headers.userid, {});
      res.send(comentario)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/putComentarioAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar comentário'
      })
    }
  },
  async delete (req, res) {
    try {
      const prevCommentario = await ComentarioAula.findOne({
        where: {
          id: req.params.comentarioId
        }
      })
      await ComentarioAula.destroy({
        where: {
          id: req.params.comentarioId
        }
      })
      await AuditCreate.createAudit(prevCommentario, null, "comentarioAula", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteAulaUsuario', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar o comentário'
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
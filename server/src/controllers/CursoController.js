const { Curso } = require('../models')
const { UsuarioAssinatura } = require('../models')
const { CursoAssinatura } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');
const SendMail = require('../core/SendMail');
const md5 = require('md5');

function hashCertificado(inscricaoId, options) {
  return md5(`${inscricaoId}`);
}

module.exports = {
  async index (req, res) {
    try {
      const cursos = await Curso.findAll({
        limit: 50
      })
      res.send(cursos)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/indexCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de cursos'
      })
    }
  },
  async view (req, res) {
    try {
      const cursos = await Curso.findAll({
        where: {
          ind_visivel: 'S'
        }
      })
      res.send(cursos)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de cursos'
      })
    }
  },
  async viewCursosAssinatura (req, res) {
    try {      
      const assinatura = await UsuarioAssinatura.findOne({
        where: {
          id_user: req.params.userId
        }
      })
      if (!assinatura) {
        return res.status(403).send({
          error: 'Registro de assinatura não encontrado. Não é permitido consultar os cursos!'
        })
      }
      CursoAssinatura.belongsTo(Curso, { foreignKey: 'id_curso' })
      Curso.hasMany(CursoAssinatura, { foreignKey: 'id_curso' })
      const cursos = await Curso.findAll({
        include: [{
          model: CursoAssinatura, 
          where: {
            id_assinatura: assinatura.id_assinatura
          },
          required: true
        }],
      })
      res.send(cursos)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewCursosAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de cursos'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const curso = await Curso.create(req.body)
      await AuditCreate.createAudit(null, curso, "curso", "CREATE", req.headers.userid, {});
      res.send(curso)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar curso'
      })
    }
  },
  async put (req, res) {
    try {
      const prevCurso = await Curso.findOne({
        where: {
          id: req.params.cursoId
        }
      })
      const curso = await Curso.update(req.body, {
        where: {
          id: req.params.cursoId
        }
      })
      await AuditCreate.createAudit(prevCurso, curso, "curso", "UPDATE", req.headers.userid, {});
      res.send(curso)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/putCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar curso'
      })
    }
  },
  async delete (req, res) {
    try {
      const prevCurso = await Curso.findOne({
        where: {
          id: req.params.cursoId
        }
      })
      await Curso.destroy({
        where: {
          id: req.params.cursoId
        }
      })
      await AuditCreate.createAudit(prevCurso, null, "curso", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar curso'
      })
    }
  },
  async show (req, res) {
    try {
      const curso = await Curso.findOne({
        where: {
          id: req.params.cursoId
        }
      })
      res.send(curso)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o curso'
      })
    }
  }
}

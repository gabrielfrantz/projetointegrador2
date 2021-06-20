const { CursoAssinatura } = require('../models')
const { Curso } = require('../models')
const { Assinatura } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate')

module.exports = {
  async view (req, res) {
    try {
      CursoAssinatura.belongsTo(Curso, { foreignKey: 'id_curso' })
      Curso.hasMany(CursoAssinatura, { foreignKey: 'id_curso' })
      const cursos = await Curso.findAll({
        order: [['nom_curso', 'asc']],
        //attributes: { include: [[Op.literal('CASE WHEN NOM_CURSO IS NOT NULL THEN TRUE ELSE FALSE END'), 'field3']]},
        include: [{
          model: CursoAssinatura, 
          where: {
            id_assinatura: req.params.assinaturaId
          },
          required: true
        }]        
      })
      res.send(cursos)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewCursoAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de curso assinatura'
      })
    }
  },
  async post (req, res) {
    try {
      const curso = await CursoAssinatura.create(req.body)
      await AuditCreate.createAudit(null, curso, "cursoAssinatura", "CREATE", req.headers.userid, {});
      res.send(curso)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postCursoAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar curso assinatura'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log('delete')
      const prevCursoAssinatura = await CursoAssinatura.findOne({
        where: {
          id_curso: req.params.cursoId,
          id_assinatura: req.params.assinaturaId
        }
      })
      console.log('finde')
      await CursoAssinatura.destroy({
        where: {
          id_curso: req.params.cursoId,
          id_assinatura: req.params.assinaturaId
        }
      })
      console.log('deletou')
      await AuditCreate.createAudit(prevCursoAssinatura, null, "cursoAssinatura", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteCursoAssinatura', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar curso assinatura'
      })
    }
  }
}
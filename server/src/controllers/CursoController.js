const { Curso } = require('../models')
const { UsuarioAssinatura } = require('../models')
const { CursoAssinatura } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');
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
        error: 'Ocorreu um erro ao buscar a lista de eventos'
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
        error: 'Ocorreu um erro ao buscar a lista de eventos'
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
        error: 'Ocorreu um erro ao buscar a lista de eventos'
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
  },
  async geraCertificado(req, res) {
    try {
      console.log(req.params.inscricaoId)
      const des_hash = hashCertificado(req.params.inscricaoId);
      User.hasMany(Inscricao, { foreignKey: 'userId' })
      Inscricao.belongsTo(User, { foreignKey: 'userId' })
      Evento.hasMany(Inscricao, { foreignKey: 'eventoId' })
      Inscricao.belongsTo(Evento, { foreignKey: 'eventoId' })
      var inscricao = await Inscricao.findOne({
        where: {
          id: req.params.inscricaoId,
          ind_checkin: 1
        }, include: [Evento, User]
      })

      if (!inscricao) {
         return res.status(403).send({
           error: 'Registro de presença não encontrado. Não é permitido gerar o certificado!'
         })
       }

      EnviarEmail(inscricao.User.dataValues.email, 'Certificado gerado', `Seu certificado para o curso ${inscricao.Evento.dataValues.nom_evento} foi gerado!`)

      const certificado = {
        idInscricao: req.params.inscricaoId,
        nom_curso: '',
        nom_pessoa: inscricao.User.dataValues.nom_pessoa,
        num_cpf: inscricao.User.dataValues.num_cpf,
        dta_evento: inscricao.Evento.dataValues.dta_evento,
        des_hash: des_hash
      }

      inscricao = await Inscricao.update({
        des_hash: des_hash
      }, {
        where: {
          id: req.params.inscricaoId
        }
      })     

      const response = await fetch('http://localhost:3001/gerarCertificado', {
        method: 'POST',
        body: JSON.stringify(certificado),
        headers: { 'Content-Type': 'application/json' },
      });
      const buffer = await response.buffer();
      //console.log(buffer)

      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao gerar certificado' + err
      })
    }
  },
  async validaCertificado(req, res) {
    try {
      User.hasMany(Inscricao, { foreignKey: 'userId' })
      Inscricao.belongsTo(User, { foreignKey: 'userId' })
      Evento.hasMany(Inscricao, { foreignKey: 'eventoId' })
      Inscricao.belongsTo(Evento, { foreignKey: 'eventoId' })
      var inscricao = await Inscricao.findOne({
        where: {
          des_hash: req.params.desHash
        }, include: [Evento, User]
      })

      if (!inscricao) {
        return res.status(403).send({
          error: 'Chave do certificado não encontrada!'
        })
      }

      res.send(inscricao)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao validar chave do certificado' + err
      })
    }
  }
}

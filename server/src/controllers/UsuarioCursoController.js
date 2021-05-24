const { Curso } = require('../models')
const { User } = require('../models')
const { UsuarioCurso } = require('../models')
const { Op } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');
const SendMail = require('../core/SendMail');
const md5 = require('md5');

function hashCertificado(inscricaoId, options) {
  return md5(`${inscricaoId}`);
}

module.exports = {
  async geraCertificado(req, res) {
    try {
      const des_hash = hashCertificado('CERTIF_' + req.params.userId + '_' + req.params.cursoId);
      var user = User.findOne({
        where: {
          id: req.params.userId
        }
      })
      var curso = await Curso.findOne({
        where: {
          id: req.params.cursoId,
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'Usuário não encontrado. Não é permitido gerar o certificado!'
        })
      }
      if (!curso) {
         return res.status(403).send({
           error: 'Curso não encontrado. Não é permitido gerar o certificado!'
        })
      }

      const hasUserCurso = UsuarioCurso.findOne({
        where: {
          id_user: req.params.userId, 
          id_curso:req.params.cursoId
        }
      })
      if (!hasUserCurso){
        userCurso = {
          id_user: req.params.userId, 
          id_curso:req.params.cursoId,
          des_hash: des_hash
        }
        const usuarioCurso = await UsuarioCurso.create(req.body)
        await AuditCreate.createAudit(null, usuarioCurso, "usuarioCurso", "CREATE", req.headers.userid, {});
      }
      await SendMail.EnviarEmail(user.email, 'Certificado gerado', `Seu certificado para o curso ${curso.nom_evento} foi gerado!`);

      const certificado = {
        nom_curso: curso.nom_curso,
        nom_pessoa: user.nom_pessoa,
        num_cpf: user.num_cpf,
        dta_evento: Date.now(),
        des_hash: des_hash
      }

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
      LogCreate.post(req.headers.userid, '/geraCertificado', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao gerar certificado' + err
      })
    }
  },
  async validaCertificado(req, res) {
    try {
      UsuarioCurso.belongsTo(User, { foreignKey: 'id_user' })
      UsuarioCurso.belongsTo(Curso, { foreignKey: 'id_curso' })
      var certificado = await UsuarioCurso.findOne({
        where: {
          des_hash: req.params.desHash
        }, include: [Curso, User]
      })

      if (!certificado) {
        return res.status(403).send({
          error: 'Chave do certificado não encontrada!'
        })
      }

      res.send(certificado)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/validaCertificado', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao validar chave do certificado' + err
      })
    }
  }
}

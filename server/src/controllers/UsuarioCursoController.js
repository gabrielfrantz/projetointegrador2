const { Curso } = require('../models')
const { User } = require('../models')
const { Aula } = require('../models')
const { Modulo } = require('../models')
const { UsuarioCurso } = require('../models')
const { AulaUsuario } = require('../models')
const { Op, DATE } = require('sequelize')
const LogCreate = require('../core/LogCreate')
const AuditCreate = require('../core/AuditCreate');
const SendMail = require('../core/SendMail');
const fetch = require('node-fetch');
const md5 = require('md5');
const fs = require('fs');

function hashCertificado(inscricaoId, options) {
  return md5(`${inscricaoId}`);
}

module.exports = {
  async view(req, res) {
    try {
      AulaUsuario.belongsTo(User, { foreignKey: 'id_user' })
      User.hasMany(AulaUsuario, { foreignKey: 'id_user' })
      UsuarioCurso.belongsTo(User, { foreignKey: 'id_user' })
      User.hasMany(UsuarioCurso, { foreignKey: 'id_user' })
      const users = await User.findAll({
        order: [['nom_pessoa', 'asc']],
        where: {
          ind_usuario: 'A'
        },
        //attributes: { include: [[Op.literal('CASE WHEN NOM_CURSO IS NOT NULL THEN TRUE ELSE FALSE END'), 'field3']]},
        include: [{
          model: AulaUsuario, 
          where: {
            ind_concluido: 'S'
          },
          required: false
        },
        {
          model: UsuarioCurso,
          where: {
            id_curso: req.params.cursoId
          },
          required: false
        }]        
      })
      res.send(users)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewUsuarioCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar usuários do curso ' + err
      })
    }
  },
  async get(req, res) {
    try {
      const usuarioCurso = await UsuarioCurso.findOne({
        where: {
          id_user: req.params.userId,
          id_curso: req.params.cursoId
        }
      })
      res.send(usuarioCurso)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/getUsuarioCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar usuário do curso ' + err
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const uCurso = await UsuarioCurso.create(req.body)
      await AuditCreate.createAudit(null, uCurso, "usuarioCurso", "CREATE", req.headers.userid, {});
      res.send(uCurso)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postUsuarioCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar curso assinatura'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log('delete')
      const prevUsuarioCurso = await UsuarioCurso.findOne({
        where: {
          id_curso: req.params.cursoId,
          id_user: req.params.userId
        }
      })
      if (prevUsuarioCurso){
        if (prevUsuarioCurso.des_hash != null){
          return res.status(403).send({
            error: 'Certificado já gerado. Não é permitido retirar a certificação!'
          })
        }
      }
      console.log('finde')
      await UsuarioCurso.destroy({
        where: {
          id_curso: req.params.cursoId,
          id_user: req.params.userId
        }
      })
      console.log('deletou')
      await AuditCreate.createAudit(prevUsuarioCurso, null, "usuarioCurso", "DELETE", req.headers.userid, {});
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteUsuarioCurso', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar curso usuário'
      })
    }
  },
  async geraCertificado(req, res) {
    try {
      console.log("CHEGOU CERTIFICADO")
      const des_hash = hashCertificado('CERTIF_' + req.params.userId + '_' + req.params.cursoId);
      var user = await User.findOne({
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
      if (!user.nom_pessoa) {
        return res.status(403).send({
          error: 'Nome e CPF do usuário não encontrado, não é permitido gerar o certificado. Verifique seu cadastro de perfil!'
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
      console.log("USERCURSO")
      if (!hasUserCurso){
        return res.status(403).send({
          error: 'Aprovação no curso não encontrado. Não é permitido gerar o certificado!'
        })

        console.log("NAO TINHA")
        userCurso = {
          id_user: req.params.userId, 
          id_curso:req.params.cursoId,
          des_hash: des_hash
        }
        const usuarioCurso = await UsuarioCurso.create(req.body)
        await AuditCreate.createAudit(null, usuarioCurso, "usuarioCurso", "CREATE", req.headers.userid, {})
      } else {
        const usuarioCurso = await UsuarioCurso.update(
          {
            des_hash: des_hash
          },
          { 
            individualHooks: true,
            where: {
              id_user: req.params.userId, 
              id_curso: req.params.cursoId
            }
          })
        await AuditCreate.createAudit(hasUserCurso, usuarioCurso, "usuarioCurso", "UPDATE", req.headers.userid, {})
      }
      await SendMail.Enviar(user.email, 'Certificado gerado', `Seu certificado para o curso ${curso.nom_curso} foi gerado!`)
      console.log("EMAIL CERTIFICADO")
      function adicionaZero(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
      }
      const dataAtual = new Date()
      const dataAtualFormatada = adicionaZero(dataAtual.getDate().toString()) + "/" + ((adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear())
      
      const certificado = {
        dta_conclusao: dataAtualFormatada,
        nom_curso: curso.nom_curso,
        qtd_horas: curso.des_carga_horaria,
        nom_pessoa: user.nom_pessoa,
        num_cpf: user.num_cpf,
        des_hash: des_hash
      }
      console.log("BEFORE FETCH CERTIFICADO")
      const response = await fetch('http://localhost:3001/gerarCertificado', {
        method: 'POST',
        body: JSON.stringify(certificado),
        headers: { 'Content-Type': 'application/json' },
      });
      const buffer = await response.buffer();
      console.log(buffer)

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

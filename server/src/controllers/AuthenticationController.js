const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      if (user.id === 1) {
        await User.update(
          { 
            ind_admin: 'S'
          }, 
          {
            where: {
              id: user.id
          }
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'A conta de e-mail já está em uso!'
      })
    }
  },
  async new(req, res) {
    try {
      const user = await User.create(req.body)
      //const userJson = user.toJSON()
      res.send(user)
    } catch (err) {
      res.status(400).send({
        error: 'A conta de e-mail já está em uso!'
      })
    }
  },
  async put (req, res) {
    try {
      const user = await User.update(
        { 
          nom_pessoa: req.body.nom_pessoa,
          num_cpf: req.body.num_cpf,
          ind_admin: req.body.ind_admin
        }, 
        {
          where: {
            id: req.params.userId
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar usuário'
      })
    }
  },
  async index (req, res) {
    try {
      const users = await User.findAll({
        limit: 50
      })
      res.send(users)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de usuários'
      })
    }
  },
  async show (req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.userId
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o user'
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      console.log(user.toJSON())
      if (!user) {
        return res.status(403).send({
          error: 'Usuário inválido!'
        })
      }
      const isPasswordValid = user.comparePassword(password)    
      console.log(isPasswordValid)  
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Senha inválida!'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar logar'
      })
    }
  }
}

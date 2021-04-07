const { Aula } = require('../models')
const LogCreate = require('../controllers/LogCreate')


module.exports = {
  async index (req, res) {
    try {
      const aulas = await Aula.findAll({
        where: {
          id_modulo: req.params.moduloId
        }
      })
      res.send(aulas)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/indexAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de aulas'
      })
    }
  },
  async view (req, res) {
    try {
      const aulas = await Aula.findAll({
        where: {
          id_modulo: req.params.moduloId,
          ind_visivel: 'S'
        }
      })
      res.send(aulas)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de aulas'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const aula = await Aula.create(req.body)
      res.send(aula)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/postAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar aula'
      })
    }
  },
  async put (req, res) {
    try {
      const aula = await Aula.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.aulaId
        }
      })
      res.send(aula)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/putAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar aula'
      })
    }
  },
  async delete (req, res) {
    try {
      await Aula.destroy({
        where: {
          id: req.params.aulaId
        }
      })
      res.send('')
    } catch (err) {
      LogCreate.post(req.headers.userid, '/deleteAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar aula'
      })
    }
  },
  async show (req, res) {
    try {
      const aula = await Aula.findOne({
        where: {
          id: req.params.aulaId
        }
      })
      res.send(aula)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showAula', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a aula'
      })
    }
  }
}
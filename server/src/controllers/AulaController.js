const { Aula } = require('../models')


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
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar aula'
      })
    }
  },
  async put (req, res) {
    try {
      const aula = await Aula.update(req.body, {
        where: {
          id: req.params.aulaId
        }
      })
      res.send(aula)
    } catch (err) {
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
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a aula'
      })
    }
  }
}
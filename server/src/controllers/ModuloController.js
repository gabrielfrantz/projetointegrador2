const { Modulo } = require('../models')


module.exports = {
  async index (req, res) {
    try {
      console.log(req.params.cursoId)
      const modulos = await Modulo.findAll({
        where: {
          id_curso: req.params.cursoId
        }
      })
      res.send(modulos)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de modulos'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const modulo = await Modulo.create(req.body)
      res.send(modulo)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar modulo'
      })
    }
  },
  async put (req, res) {
    try {
      const modulo = await Modulo.update(req.body, {
        where: {
          id: req.params.moduloId
        }
      })
      res.send(modulo)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar modulo'
      })
    }
  },
  async delete (req, res) {
    try {
      await Modulo.destroy({
        where: {
          id: req.params.moduloId
        }
      })
      res.send('')
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao deletar modulo'
      })
    }
  },
  async show (req, res) {
    try {
      const modulo = await Modulo.findOne({
        where: {
          id: req.params.moduloId
        }
      })
      res.send(modulo)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o modulo'
      })
    }
  }
}
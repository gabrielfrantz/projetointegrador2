const { Curso } = require('../models')


module.exports = {
  async index (req, res) {
    try {
      const cursos = await Curso.findAll({
        limit: 50
      })
      res.send(cursos)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de eventos'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const curso = await Curso.create(req.body)
      res.send(curso)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar curso'
      })
    }
  },
  async put (req, res) {
    try {
      const curso = await Curso.update(req.body, {
        where: {
          id: req.params.cursoId
        }
      })
      res.send(curso)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao salvar curso'
      })
    }
  },
  async delete (req, res) {
    try {
      await Curso.destroy({
        where: {
          id: req.params.cursoId
        }
      })
      res.send('')
    } catch (err) {
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
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o curso'
      })
    }
  }
}

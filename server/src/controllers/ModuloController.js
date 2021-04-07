const { Modulo } = require('../models')
const { Aula } = require('../models')
const LogCreate = require('../controllers/LogCreate')


module.exports = {
  async index (req, res) {
    try {
      const modulos = await Modulo.findAll({
        where: {
          id_curso: req.params.cursoId
        }
      })
      res.send(modulos)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/indexModulo', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de modulos'
      })
    }
  },
  async view (req, res) {
    try {
      Modulo.hasMany(Aula, { foreignKey: 'id_modulo' })
      const modulos = await Modulo.findAll({
        where: { id_curso: req.params.cursoId, ind_visivel: 'S' },
        include: [{
          model: Aula, 
          required: false,
          where: { 
            ind_visivel: 'S' 
          }
        }]
      })
      res.send(modulos)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewModulo', req.params, req.body, err)
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
      LogCreate.post(req.headers.userid, '/postModulo', req.params, req.body, err)
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
      LogCreate.post(req.headers.userid, '/putModulo', req.params, req.body, err)
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
      LogCreate.post(req.headers.userid, '/deleteModulo', req.params, req.body, err)
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
      LogCreate.post(req.headers.userid, '/showModulo', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o modulo'
      })
    }
  }
}
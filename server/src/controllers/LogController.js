const { Log } = require('../models')
const LogCreate = require('../controllers/LogCreate')

module.exports = {
  async view(req, res) {
    try {
      const logs = await Log.findAll({
        limit: 50,
        order: [['createdAt', 'desc']],
      })
      res.send(logs)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewLog', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de logs'
      })
    }
  }
}
const { Log } = require('../models')
const { User } = require('../models')
const LogCreate = require('../controllers/LogCreate')

module.exports = {
  async view(req, res) {
    try {
      Log.belongsTo(User, { foreignKey: 'id_user' })
      const logs = await Log.findAll({
        limit: 50,
        order: [['createdAt', 'desc']],
        include: [{
          model: User, 
          attributes: ['email', 'nom_pessoa'],
          required: false
        }]
      })
      res.send(logs)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewLog', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de logs'
      })
    }
  },
  async show (req, res) {
    try {
      Log.belongsTo(User, { foreignKey: 'id_user' })
      const log = await Log.findOne({
        where: {
          id: req.params.logId
        },
        include: [{
          model: User, 
          attributes: ['email', 'nom_pessoa'],
          required: false
        }]
      })
      res.send(log)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showLog', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o Log'
      })
    }
  }
}
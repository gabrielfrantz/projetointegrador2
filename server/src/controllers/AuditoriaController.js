const { Auditoria } = require('../models')
const { User } = require('../models')
const LogCreate = require('../core/LogCreate')

module.exports = {
  async view(req, res) {
    try {
      console.log(offset)

      Auditoria.belongsTo(User, { foreignKey: 'id_user' })
      const audits = await Auditoria.findAll({
        order: [['createdAt', 'desc']],
        include: [{
          model: User, 
          attributes: ['email', 'nom_pessoa'],
          required: false
        }]
      })
      res.send(audits)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewAuditoria', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar a lista de auditoria'
      })
    }
  },
  async show (req, res) {
    try {
      Auditoria.belongsTo(User, { foreignKey: 'id_user' })
      const audit = await Auditoria.findOne({
        where: {
          id: req.params.auditoriaId
        },
        include: [{
          model: User, 
          attributes: ['email', 'nom_pessoa'],
          required: false
        }]
      })
      res.send(audit)
    } catch (err) {
      LogCreate.post(req.headers.userid, '/showAuditoria', req.params, req.body, err)
      res.status(500).send({
        error: 'Ocorreu um erro ao buscar o Log'
      })
    }
  },
  async viewQ(req, res) {
    try {
      console.log(req.query)
      let page = req.query.page
      let limit = req.query.limit
      let id_user = req.query.id_user
      let offset = (page * limit) - limit

      Auditoria.belongsTo(User, { foreignKey: 'id_user' })
      const audits = await Auditoria.findAll({
        limit: limit,
        offset: offset,
        order: [['createdAt', 'desc']],
        include: [{
          model: User, 
          attributes: ['email', 'nom_pessoa'],
          required: false
        }],
        where: {
          id_user: id_user
        }
      })
      return Promise.resolve({
        status: 200,
        message: audits,
      });
    } catch (err) {
      LogCreate.post(req.headers.userid, '/viewAuditoria', req.params, req.body, err)
      return Promise.reject({
        status: 400,
        message: 'Ocorreu um erro ao buscar a lista de auditoria',
      });
    } 
  }
}
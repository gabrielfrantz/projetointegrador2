const { Auditoria } = require('../models')

module.exports.post = async (action, model, options) => {
  try {
    console.log("chegou no controller audit")

    const audits = await Auditoria.findAll({})
    console.log(audits)
    
    auditoria = {
      id_user: 1,
      tip_acao: action,
      nom_table: model._modelOptions.name.plural,
      prevValues: JSON.stringify(model._previousDataValues, model.attributes),
      newValues: JSON.stringify(model.dataValues, model.attributes)
    }
    await Auditoria.create(auditoria)
  } catch (err) {
    console.log(err)
  }
}
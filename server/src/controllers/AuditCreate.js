const { Auditoria } = require('../models')


module.exports.post = (action, model, options) => {
  try {
    console.log("chegou no cria auditoria")

    auditoria = {
      id_user: 1,
      tip_acao: action,
      nom_table: model._modelOptions.name.plural,
      prevValues: JSON.stringify(model._previousDataValues, model.attributes),
      newValues: JSON.stringify(model.dataValues, model.attributes)
    }
    console.log(auditoria)
    Auditoria.create(auditoria)
  } catch (err) {
    console.log(err)
  }
}
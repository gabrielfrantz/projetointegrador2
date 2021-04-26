module.exports = (sequelize, DataTypes) => {
  const Auditoria = sequelize.define('Auditoria', {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tip_acao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom_table: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prevValues: {    
      type: DataTypes.TEXT,
      allowNull: false
    },
    newValues: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })

  return Auditoria
}

module.exports.post = async (action, model, options) => {
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

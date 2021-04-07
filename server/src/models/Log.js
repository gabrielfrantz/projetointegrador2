module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    id_user: {
      type: DataTypes.INTEGER
    },
    nom_url: {
      type: DataTypes.STRING
    },
    nom_erro: {
      type: DataTypes.STRING
    },
    des_params: {
      type: DataTypes.STRING(1000)
    },
    des_body: {
      type: DataTypes.STRING(1000)
    },
    des_erro: {
      type: DataTypes.STRING(1000)
    }
  })

  Log.associate = models => {
    Log.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return Log
}

module.exports = (sequelize, DataTypes) => {
  const ComentarioAula = sequelize.define('ComentarioAula', {
    id_aula: {
      type: DataTypes.INTEGER
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    des_comentario: {
      type: DataTypes.STRING
    },
    ind_oculto: {
      type: DataTypes.STRING,
      defaultValue: 'N'
    },
    id_comentario: {
      type: DataTypes.INTEGER
    }
  })

  ComentarioAula.associate = models => {
    ComentarioAula.belongsTo(models.Aula, {
      foreignKey: {
        allowNull: false
      }
    }),
    ComentarioAula.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return ComentarioAula
}

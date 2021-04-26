module.exports = (sequelize, DataTypes) => {
  const AulaUsuario = sequelize.define('AulaUsuario', {
    id_aula: {
      type: DataTypes.INTEGER
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    tempo_aula: {
      type: DataTypes.INTEGER
    },
    ind_concluido: {
      type: DataTypes.STRING,
      defaultValue: 'N'
    },
    qtd_estrela: {
      type: DataTypes.INTEGER
    }
  })

  AulaUsuario.associate = models => {
    AulaUsuario.belongsTo(models.Aula, {
      foreignKey: {
        allowNull: false
      }
    }),
    AulaUsuario.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return AulaUsuario
}

module.exports = (sequelize, DataTypes) => {
  const UsuarioAssinatura = sequelize.define('UsuarioAssinatura', {
    id_user: {
      type: DataTypes.INTEGER
    },
    id_assinatura: {
      type: DataTypes.INTEGER
    }
  })

  UsuarioAssinatura.associate = models => {
    UsuarioAssinatura.belongsTo(models.Assinatura, {
      foreignKey: {
        allowNull: false
      }
    }),
    UsuarioAssinatura.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return UsuarioAssinatura
}

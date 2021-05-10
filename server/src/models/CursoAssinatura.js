module.exports = (sequelize, DataTypes) => {
  const CursoAssinatura = sequelize.define('CursoAssinatura', {
    id_curso: {
      type: DataTypes.INTEGER
    },
    id_assinatura: {
      type: DataTypes.INTEGER
    }
  })

  CursoAssinatura.associate = models => {
    CursoAssinatura.belongsTo(models.Assinatura, {
      foreignKey: {
        allowNull: false
      }
    }),
    CursoAssinatura.belongsTo(models.Curso, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return CursoAssinatura
}

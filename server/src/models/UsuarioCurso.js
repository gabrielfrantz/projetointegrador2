module.exports = (sequelize, DataTypes) => {
  const UsuarioCurso = sequelize.define('UsuarioCurso', {
    id_user: {
      type: DataTypes.INTEGER
    },
    id_curso: {
      type: DataTypes.INTEGER
    },
    des_hash: {
      type: DataTypes.STRING
    }
  })

  UsuarioCurso.associate = models => {
    UsuarioCurso.belongsTo(models.Curso, {
      foreignKey: {
        allowNull: false
      }
    }),
    UsuarioCurso.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return UsuarioCurso
}

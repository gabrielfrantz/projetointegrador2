module.exports = (sequelize, DataTypes) => {
  const Modulo = sequelize.define('Modulo', {
    nom_modulo: {
      type: DataTypes.STRING
    },
    id_curso: {
      type: DataTypes.INTEGER
    },
    seq_ordem: {
      type: DataTypes.INTEGER
    },
    ind_visivel: {
      type: DataTypes.STRING
    }
  })

  Modulo.associate = models => {
    Modulo.belongsTo(models.Curso, {
      foreignKey: {
        allowNull: false
      }
    })
    Modulo.hasMany(models.Aula, {
      onDelete: "cascade"
    })
  }

  return Modulo
}

module.exports = (sequelize, DataTypes) => {
  const Aula = sequelize.define('Aula', {
    nom_aula: {
      type: DataTypes.STRING
    },
    des_aula: {
      type: DataTypes.STRING
    },
    src_video: {
      type: DataTypes.STRING
    },
    id_modulo: {
      type: DataTypes.INTEGER
    },
    seq_ordem: {
      type: DataTypes.INTEGER
    },
    ind_visivel: {
      type: DataTypes.STRING
    }
  })

  Aula.associate = models => {
    Aula.belongsTo(models.Modulo, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Aula
}

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
      type: DataTypes.JSON,
      allowNull: true
    },
    newValues: {
      type: DataTypes.JSON,
      allowNull: true
    }
  })

  Auditoria.associate = models => {
    Auditoria.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }

  return Auditoria
}

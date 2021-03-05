module.exports = (sequelize, DataTypes) => {
  const Evento = sequelize.define('Evento', {
    nom_curso: {
      type: DataTypes.STRING,
      unique: true
    },
    des_curso: {
      type: DataTypes.STRING
    },
    des_carga_horaria: {
      type: DataTypes.STRING
    },
    ind_visivel: {
      type: DataTypes.INTEGER
    }
  })

/*  Evento.associate = models => {
    Evento.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    Evento.hasMany(models.Inscricao, {
      onDelete: "cascade"
    })
  }*/


  return Evento
}

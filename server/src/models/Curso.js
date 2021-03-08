module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    nom_curso: {
      type: DataTypes.STRING
    },
    des_curso: {
      type: DataTypes.STRING
    },
    des_carga_horaria: {
      type: DataTypes.STRING
    },
    ind_visivel: {
      type: DataTypes.STRING
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


  return Curso
}

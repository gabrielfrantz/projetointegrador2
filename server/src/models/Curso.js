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
    src_banner: {
      type: DataTypes.STRING
    },
    ind_visivel: {
      type: DataTypes.STRING
    }
  })

  Curso.associate = models => {
    Curso.hasMany(models.Modulo, {
      onDelete: "cascade"
    })
  }


  return Curso
}

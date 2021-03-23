function getThumbnail(aula, options) {
  console.log(aula.src_video)
  src_thumbnail = aula.src_video
  if (src_thumbnail.includes('https://www.youtube.com/watch?v=')) {
    src_thumbnail = src_thumbnail.replace('https://www.youtube.com/watch?v=', 'https://img.youtube.com/vi/')
    src_thumbnail = src_thumbnail + '/0.jpg'
    aula.src_thumbnail = src_thumbnail
  }
  console.log(src_thumbnail)

  aula.setDataValue('src_thumbnail', src_thumbnail)  

  return;
}

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
    src_thumbnail: {
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
  }, {
    hooks: {
      beforeCreate: getThumbnail,
      beforeUpdate: getThumbnail
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

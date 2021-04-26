const AuditCreate = require('../controllers/AuditCreate')

function getThumbnail(aula, options) {
  console.log(aula.src_video)
  video_id = aula.src_video
  if (video_id.includes('https://www.youtube.com/watch?v=')) {
    video_id = video_id.replace('https://www.youtube.com/watch?v=', '')
  }
  if (video_id.includes('https://youtu.be/')) {
    video_id = video_id.replace('https://youtu.be/', '')
  }
  src_thumbnail = 'https://img.youtube.com/vi/' + video_id + '/0.jpg'
  aula.video_id = video_id
  aula.src_thumbnail = src_thumbnail
  console.log(video_id)
  console.log(src_thumbnail)

  aula.setDataValue('video_id', video_id)  
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
    video_id: {
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
      beforeUpdate: getThumbnail,
      afterCreate: (instance, options) => {
        AuditCreate.post('create', instance, options)
      },
      afterUpdate: (instance, options) => {
        AuditCreate.post('update', instance, options)
      }
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

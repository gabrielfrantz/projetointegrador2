//const Promise = require('bluebird')
const bcrypt = require('bcrypt')

function firstAdmin(user, options) {
  console.log(user)
  if (user.id === 1) {
    user.setDataValue('ind_admin', 'S')  
  }
  return
}

function hashPassword(user, options) {
  const saltRounds = 10;

  if (!user.changed('password')) {
    return;
  }

  const hash = bcrypt.hashSync(user.password, saltRounds);
  user.setDataValue('password', hash)  

  return;
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    nom_pessoa: DataTypes.STRING,
    num_cpf: DataTypes.STRING,
    ind_admin: {
      type: DataTypes.STRING,
      defaultValue: 'N'
    },
    ind_usuario: {
      type: DataTypes.STRING,
      defaultValue: 'A'
    }
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  User.associate = models => {
    User.hasMany(models.Log, {
      onDelete: "cascade"
    }),
    User.hasMany(models.Auditoria, {
      onDelete: "cascade"
    }),
    User.hasMany(models.AulaUsuario, {
      onDelete: "cascade"
    })
  }

  User.prototype.comparePassword = function (password) {
    var vtest = bcrypt.compareSync(password, this.password)
    return vtest;
  }

  return User
}

//const Promise = require('bluebird')
const bcrypt = require('bcrypt')

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
    num_cpf: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    var vtest = bcrypt.compareSync(password, this.password)
    return vtest;
  }

  return User
}

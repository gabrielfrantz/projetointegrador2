'use strict';

const bcrypt = require('bcryptjs');

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        username: 'faiza.schoeninger',
        des_email: 'admin@educare.com.br',
        des_password: bcrypt.hashSync('admeducare', 10),
        nom_pessoa: 'Admin',
        num_cpf: '',
        ind_admin: 'S'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
}
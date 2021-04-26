const models = require('../models');

module.exports.createAudit = async (registerBefore, registerAfter, table, type, userId, options = {})  => {
    console.log('auditCore')
    await models.Auditoria.create({
      prevValues: registerBefore,
      newValues: registerAfter,
      nom_table: table,
      tip_acao: type,
      id_user: userId
    })
}

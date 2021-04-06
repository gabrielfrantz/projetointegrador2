const { Log } = require('../models')

module.exports.post = async (userId, nomUrl, desBody, desErro) => {
  try {
    console.log("chegou no cria log")
    console.log(desBody)
    console.log(desErro)
    log = {
      id_user: userId,
      nom_url: nomUrl,
      des_body: JSON.stringify(desBody),
      des_erro: JSON.stringify(desErro)
    }
    await Log.create(log)
  } catch (err) {
    console.log(err)
  }
}

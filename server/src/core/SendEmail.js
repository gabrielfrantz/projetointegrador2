const fetch = require('node-fetch');

module.exports.EnviarEmail = async (destinatario, assunto, mensagem) => {
  try {
    const req = {
      destinatario: destinatario,
      assunto: assunto,
      texto: mensagem
    }
    await fetch('http://localhost:3002/enviarEmail', {
          method: 'POST',
          body: JSON.stringify(req),
          headers: { 'Content-Type': 'application/json' },
        });
  } catch (err) {
    console.log(err)
  }
}


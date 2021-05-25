const fetch = require('node-fetch')

module.exports.Enviar = async (destinatario, assunto, mensagem) => {
  try {
    console.log('Teste')
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


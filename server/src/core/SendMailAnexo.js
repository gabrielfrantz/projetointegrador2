const fetch = require('node-fetch')

module.exports.Enviar = async (destinatario, assunto, mensagem, filename, path) => {
  try {
    console.log('Teste')
    const req = {
      destinatario: destinatario,
      assunto: assunto,
      texto: mensagem,
      filename: filename,
      path: path
    }
    await fetch('http://localhost:3002/enviarEmailAnexo', {
          method: 'POST',
          body: JSON.stringify(req),
          headers: { 'Content-Type': 'application/json' },
        });
  } catch (err) {
    console.log(err)
  }
}


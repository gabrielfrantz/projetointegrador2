const Joi = require('joi')

module.exports = {
    register(req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        console.log('validaderegister')
        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Você deve informar um endereço de e-mail válido!'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `A senha informada deve seguir as regras abaixo:
                        <br>
                        1. Deve conter letras e/ou números
                        <br>
                        2. Deve possuir pelo menos 8 caracteres e não mais do que 32.
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Dados para registrar-se são inválidos!'
                    })
            }
        } else {
            next()
        }
    }
}
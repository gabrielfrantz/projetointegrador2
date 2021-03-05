const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const CursoController = require('./controllers/CursoController')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/newUser', AuthenticationController.new)
  app.post('/login', AuthenticationController.login)
  app.put('/user/:userId', AuthenticationController.put)
  app.get('/user/:userId', AuthenticationController.show)
  app.get('/users', AuthenticationController.index)
  app.get('/curso', CursoController.index)
  app.post('/curso', CursoController.post)
  app.get('/curso/:cursoId', CursoController.show)
  app.put('/curso/:cursoId', CursoController.put)
  app.delete('/curso/:cursoId', CursoController.delete)
}

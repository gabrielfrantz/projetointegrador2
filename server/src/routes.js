const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const CursoController = require('./controllers/CursoController')
const ModuloController = require('./controllers/ModuloController')
const AulaController = require('./controllers/AulaController')
const LogController = require('./controllers/LogController')
const AuditoriaController = require('./controllers/AuditoriaController')
const AulaUsuarioController = require('./controllers/AulaUsuarioController')

module.exports = (app) => {
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/newUser', AuthenticationController.new)
  app.post('/login', AuthenticationController.login)
  app.put('/user/:userId', AuthenticationController.put)
  app.get('/user/:userId', AuthenticationController.show)
  app.get('/usersView', AuthenticationController.view)
  app.put('/userPermission/:userId', AuthenticationController.permission)
  app.get('/users', AuthenticationController.index)
  app.get('/cursos', CursoController.index)
  app.get('/cursosView', CursoController.view)
  app.post('/curso', CursoController.post)
  app.get('/curso/:cursoId', CursoController.show)
  app.put('/curso/:cursoId', CursoController.put)
  app.delete('/curso/:cursoId', CursoController.delete)
  app.get('/modulos/:cursoId', ModuloController.index)
  app.get('/modulosView/:cursoId', ModuloController.view)
  app.post('/modulo', ModuloController.post)
  app.get('/modulo/:moduloId', ModuloController.show)
  app.put('/modulo/:moduloId', ModuloController.put)
  app.delete('/modulo/:moduloId', ModuloController.delete)
  app.get('/aulas/:moduloId', AulaController.index)
  app.get('/aulasView/:moduloId', AulaController.view)
  app.post('/aula', AulaController.post)
  app.get('/aula/:aulaId', AulaController.show)
  app.put('/aula/:aulaId', AulaController.put)
  app.delete('/aula/:aulaId', AulaController.delete)
  app.get('/logView', LogController.view)
  app.get('/log/:logId', LogController.show)
  app.get('/auditoriaView', AuditoriaController.view)
  app.get('/auditoria/:auditoriaId', AuditoriaController.show)
  app.get('/auditoriaViewQ', async function(req, res) {
    AuditoriaController.viewQ(req, res)
      .then((response) => {
        res.status(response.status).json(response.message)
      }).catch((error) => {
        res.status(error.status).json(error.message);
      })
  })
  app.get('/aulaUsuarios', AulaUsuarioController.view)  
  app.post('/aulaUsuario', AulaUsuarioController.upsert)  
  app.get('/aulaUsuario/:aulaId/:userId', AulaUsuarioController.show)  
}

import Api from '@/services/Api'

export default {
  index (userId, token) {
    return Api(userId, token).get('cursos')
  },
  view (userId, token) {
    return Api(userId, token).get('cursosView')
  },
  viewAssinatura (userId, token) {
    return Api(userId, token).get(`cursosAssinaturaView/${userId}`)
  },
  post (userId, curso, token) {
    return Api(userId, token).post('curso', curso)
  },
  show (userId, cursoId, token) {
    return Api(userId, token).get(`curso/${cursoId}`)
  },
  put (userId, curso, token) {
    return Api(userId, token).put(`curso/${curso.id}`, curso)
  },
  delete (userId, cursoId, token) {
    return Api(userId, token).delete(`curso/${cursoId}`)
  }
}

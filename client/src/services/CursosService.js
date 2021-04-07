import Api from '@/services/Api'

export default {
  index (userId) {
    return Api(userId).get('cursos')
  },
  view (userId) {
    return Api(userId).get('cursosView')
  },
  post (userId, curso) {
    return Api(userId).post('curso', curso)
  },
  show (userId, cursoId) {
    return Api(userId).get(`curso/${cursoId}`)
  },
  put (userId, curso) {
    return Api(userId).put(`curso/${curso.id}`, curso)
  },
  delete (userId, cursoId) {
    return Api(userId).delete(`curso/${cursoId}`)
  }
}

import Api from '@/services/Api'

export default {
  index (userId, cursoId, token) {
    return Api(userId, token).get(`modulos/${cursoId}`)
  },
  view (userId, cursoId, token) {
    return Api(userId, token).get(`modulosView/${cursoId}`)
  },
  post (userId, modulo, token) {
    return Api(userId, token).post('modulo', modulo)
  },
  show (userId, moduloId, token) {
    return Api(userId, token).get(`modulo/${moduloId}`)
  },
  put (userId, modulo, token) {
    return Api(userId, token).put(`modulo/${modulo.id}`, modulo)
  },
  delete (userId, moduloId, token) {
    return Api(userId, token).delete(`modulo/${moduloId}`)
  }
}

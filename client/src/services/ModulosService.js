import Api from '@/services/Api'

export default {
  index (userId, cursoId) {
    return Api(userId).get(`modulos/${cursoId}`)
  },
  view (userId, cursoId) {
    return Api(userId).get(`modulosView/${cursoId}`)
  },
  post (userId, modulo) {
    return Api(userId).post('modulo', modulo)
  },
  show (userId, moduloId) {
    return Api(userId).get(`modulo/${moduloId}`)
  },
  put (userId, modulo) {
    return Api(userId).put(`modulo/${modulo.id}`, modulo)
  },
  delete (userId, moduloId) {
    return Api(userId).delete(`modulo/${moduloId}`)
  }
}

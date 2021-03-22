import Api from '@/services/Api'

export default {
  index (cursoId) {
    return Api().get(`modulos/${cursoId}`)
  },
  post (modulo) {
    return Api().post('modulo', modulo)
  },
  show (moduloId) {
    return Api().get(`modulo/${moduloId}`)
  },
  put (modulo) {
    return Api().put(`modulo/${modulo.id}`, modulo)
  },
  delete (moduloId) {
    return Api().delete(`modulo/${moduloId}`)
  }
}

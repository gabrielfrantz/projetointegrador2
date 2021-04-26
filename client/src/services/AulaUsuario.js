import Api from '@/services/Api'

export default {
  view (userId) {
    return Api(userId).get(`aulaUsuarios`)
  },
  post (userId, aulaUsuario) {
    return Api(userId).post('aulaUsuario', aulaUsuario)
  },
  show (userId, aulaId) {
    return Api(userId).get(`aulaUsuario/${aulaId}/${userId}`)
  },
  showMedia (userId, aulaId) {
    return Api(userId).get(`aulaUsuarioMedia/${aulaId}`)
  }
}

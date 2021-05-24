import Api from '@/services/Api'

export default {
  view (userId, token) {
    return Api(userId, token).get(`aulaUsuarios`)
  },
  post (userId, aulaUsuario, token) {
    return Api(userId, token).post('aulaUsuario', aulaUsuario)
  },
  show (userId, aulaId, token) {
    return Api(userId, token).get(`aulaUsuario/${aulaId}/${userId}`)
  },
  showMedia (userId, aulaId, token) {
    return Api(userId, token).get(`aulaUsuarioMedia/${aulaId}`)
  }
}

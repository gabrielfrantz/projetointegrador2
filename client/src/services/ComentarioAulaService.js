import Api from '@/services/Api'

export default {
  view (userId, aulaId, token) {
    return Api(userId, token).get(`comentarioAula/${aulaId}`)
  },
  post (userId, comentarioAula, token) {
    return Api(userId, token).post('comentarioAula', comentarioAula)
  },
  put (userId, comentarioId, comentarioAula, token) {
    return Api(userId, token).put(`comentarioAula/${comentarioId}`, comentarioAula)
  },
  delete (userId, comentarioId, token) {
    return Api(userId, token).delete(`comentarioAula/${comentarioId}`)
  }
}

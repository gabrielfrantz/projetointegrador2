import Api from '@/services/Api'

export default {
  view (userId, aulaId) {
    return Api(userId).get(`comentarioAula/${aulaId}`)
  },
  post (userId, comentarioAula) {
    return Api(userId).post('comentarioAula', comentarioAula)
  },
  put (userId, comentarioId, comentarioAula) {
    return Api(userId).put(`comentarioAula/${comentarioId}`, comentarioAula)
  },
  delete (userId, comentarioId) {
    return Api(userId).delete(`comentarioAula/${comentarioId}`)
  }
}

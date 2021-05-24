import Api from '@/services/Api'

export default {
  index (userId, moduloId, token) {
    return Api(userId, token).get(`aulas/${moduloId}`)
  },
  view (userId, moduloId, token) {
    return Api(userId, token).get(`aulasView/${moduloId}`)
  },
  post (userId, aula, token) {
    return Api(userId, token).post('aula', aula)
  },
  show (userId, aulaId, token) {
    return Api(userId, token).get(`aula/${aulaId}`)
  },
  put (userId, aula, token) {
    return Api(userId, token).put(`aula/${aula.id}`, aula)
  },
  delete (userId, aulaId, token) {
    return Api(userId, token).delete(`aula/${aulaId}`)
  }
}

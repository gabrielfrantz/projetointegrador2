import Api from '@/services/Api'

export default {
  index (userId, moduloId) {
    return Api(userId).get(`aulas/${moduloId}`)
  },
  view (userId, moduloId) {
    return Api(userId).get(`aulasView/${moduloId}`)
  },
  post (userId, aula) {
    return Api(userId).post('aula', aula)
  },
  show (userId, aulaId) {
    return Api(userId).get(`aula/${aulaId}`)
  },
  put (userId, aula) {
    return Api(userId).put(`aula/${aula.id}`, aula)
  },
  delete (userId, aulaId) {
    return Api(userId).delete(`aula/${aulaId}`)
  }
}

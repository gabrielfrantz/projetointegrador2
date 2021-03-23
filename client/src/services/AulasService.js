import Api from '@/services/Api'

export default {
  index (moduloId) {
    return Api().get(`aulas/${moduloId}`)
  },
  view (moduloId) {
    return Api().get(`aulasView/${moduloId}`)
  },
  post (aula) {
    return Api().post('aula', aula)
  },
  show (aulaId) {
    return Api().get(`aula/${aulaId}`)
  },
  put (aula) {
    return Api().put(`aula/${aula.id}`, aula)
  },
  delete (aulaId) {
    return Api().delete(`aula/${aulaId}`)
  }
}

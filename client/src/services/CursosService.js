import Api from '@/services/Api'

export default {
  index () {
    return Api().get('curso')
  },
  post (curso) {
    return Api().post('curso', curso)
  },
  show (cursoId) {
    return Api().get(`curso/${cursoId}`)
  },
  put (curso) {
    return Api().put(`curso/${curso.id}`, curso)
  },
  delete (cursoId) {
    return Api().delete(`curso/${cursoId}`)
  }
}

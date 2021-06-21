import Api from '@/services/Api'

export default {
  view (userId, cursoId, token) {
    return Api(userId, token).get(`viewUsuariosCurso/${cursoId}`)
  },
  get (userId, cursoId, token) {
    return Api(userId, token).get(`usuarioCurso/${userId}/${cursoId}`)
  },
  post (userId, usuarioCurso, token) {
    return Api(userId, token).post('usuarioCurso', usuarioCurso)
  },
  delete (userId, cursoId, token) {
    return Api(userId, token).delete(`usuarioCurso/${userId}/${cursoId}`)
  }
}

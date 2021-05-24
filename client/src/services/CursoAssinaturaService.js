import Api from '@/services/Api'

export default {
  view (userId, assinaturaId, token) {
    return Api(userId, token).get(`cursoAssinatura/${assinaturaId}`)
  },
  post (userId, cursoAssinatura, token) {
    return Api(userId, token).post('cursoAssinatura', cursoAssinatura)
  },
  delete (userId, cursoId, assinaturaId, token) {
    return Api(userId, token).delete(`cursoAssinatura/${cursoId}/${assinaturaId}`)
  }
}

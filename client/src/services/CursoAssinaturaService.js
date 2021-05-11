import Api from '@/services/Api'

export default {
  view (userId, assinaturaId) {
    return Api(userId).get(`cursoAssinatura/${assinaturaId}`)
  },
  post (userId, cursoAssinatura) {
    return Api(userId).post('cursoAssinatura', cursoAssinatura)
  },
  delete (userId, cursoId, assinaturaId) {
    return Api(userId).delete(`cursoAssinatura/${cursoId}/${assinaturaId}`)
  }
}

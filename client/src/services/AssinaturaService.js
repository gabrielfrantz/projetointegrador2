import Api from '@/services/Api'

export default {
  view (userId) {
    return Api(userId).get('assinaturas')
  },
  post (userId, assinatura) {
    return Api(userId).post('assinatura', assinatura)
  },
  show (userId, assinaturaId) {
    return Api(userId).get(`assinatura/${assinaturaId}`)
  },
  put (userId, assinatura) {
    return Api(userId).put(`assinatura/${assinatura.id}`, assinatura)
  },
  delete (userId, assinaturaId) {
    return Api(userId).delete(`assinatura/${assinaturaId}`)
  }
}

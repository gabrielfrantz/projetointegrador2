import Api from '@/services/Api'

export default {
  show (userId) {
    return Api(userId).get(`usuarioAssinatura/${userId}`)
  },
  post (userId, usuarioAssinatura) {
    return Api(userId).post('usuarioAssinatura', usuarioAssinatura)
  },
  delete (userId, assinaturaId) {
    return Api(userId).delete(`usuarioAssinatura/${userId}/${assinaturaId}`)
  }
}

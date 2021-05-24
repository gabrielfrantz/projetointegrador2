import Api from '@/services/Api'

export default {
  show (userId, token) {
    return Api(userId, token).get(`usuarioAssinatura/${userId}`)
  },
  post (userId, usuarioAssinatura, token) {
    return Api(userId, token).post('usuarioAssinatura', usuarioAssinatura)
  },
  delete (userId, assinaturaId, token) {
    return Api(userId, token).delete(`usuarioAssinatura/${userId}/${assinaturaId}`)
  }
}

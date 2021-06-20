import Api from '@/services/Api'

export default {
  view (userId, token) {
    return Api(userId, token).get('assinaturas')
  },
  post (userId, assinatura, token) {
    return Api(userId, token).post('assinatura', assinatura)
  },
  get (userId, assinaturaId, token) {
    return Api(userId, token).get(`assinatura/${assinaturaId}`)
  },
  show (userId, assinaturaId, token) {
    return Api(userId, token).get(`assinatura/${assinaturaId}`)
  },
  put (userId, assinatura, token) {
    return Api(userId, token).put(`assinatura/${assinatura.id}`, assinatura)
  },
  delete (userId, assinaturaId, token) {
    return Api(userId, token).delete(`assinatura/${assinaturaId}`)
  },
  pagarCartao (userId, assinaturaId, token) {
    return Api(userId, token).post(`pagarCartao/${userId}/${assinaturaId}`)
  },
  pagarBoleto (userId, assinaturaId, token) {
    return Api(userId, token).post(`pagarBoleto/${userId}/${assinaturaId}`)
  }
}

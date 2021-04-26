import Api from '@/services/Api'

export default {
  view (userId) {
    return Api(userId).get('auditoriaView')
  },
  show (userId, auditoriaId) {
    return Api(userId).get(`auditoria/${auditoriaId}`)
  }
}

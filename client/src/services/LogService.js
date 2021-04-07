import Api from '@/services/Api'

export default {
  view (userId) {
    return Api(userId).get('logView')
  },
  show (userId, logId) {
    return Api(userId).get(`log/${logId}`)
  }
}

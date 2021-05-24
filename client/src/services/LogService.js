import Api from '@/services/Api'

export default {
  view (userId, dtaStart, dtaEnd, token) {
    return Api(userId, token).get(`logView?dtaStart=${dtaStart}&dtaEnd=${dtaEnd}`)
  },
  show (userId, logId, token) {
    return Api(userId, token).get(`log/${logId}`)
  }
}

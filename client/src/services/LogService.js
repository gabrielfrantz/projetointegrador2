import Api from '@/services/Api'

export default {
  view (userId, dtaStart, dtaEnd) {
    return Api(userId).get(`logView?dtaStart=${dtaStart}&dtaEnd=${dtaEnd}`)
  },
  show (userId, logId) {
    return Api(userId).get(`log/${logId}`)
  }
}

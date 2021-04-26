import Api from '@/services/Api'

export default {
  view (userId) {
    return Api(userId).get('auditoriaView')
  },
  viewQ (userId, offset, limit, dtaStart, dtaEnd) {
    return Api(userId).get(`auditoriaViewQ?offset=${offset}&limit=${limit}&dtaStart=${dtaStart}&dtaEnd=${dtaEnd}`)
  },
  show (userId, auditoriaId) {
    return Api(userId).get(`auditoria/${auditoriaId}`)
  }
}

import Api from '@/services/Api'

export default {
  view (userId, token) {
    return Api(userId, token).get('auditoriaView')
  },
  viewQ (userId, offset, limit, dtaStart, dtaEnd, token) {
    return Api(userId, token).get(`auditoriaViewQ?offset=${offset}&limit=${limit}&dtaStart=${dtaStart}&dtaEnd=${dtaEnd}`)
  },
  show (userId, auditoriaId, token) {
    return Api(userId, token).get(`auditoria/${auditoriaId}`)
  }
}

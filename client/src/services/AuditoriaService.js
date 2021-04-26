import Api from '@/services/Api'

export default {
  view (userId) {
    return Api(userId).get('auditoriaView')
  },
  viewQ (userId, page, limit, dtaStart, dtaEnd) {
    return Api(userId).get(`auditoriaView?page=${page}&limit=${limit}&dtastart=${dtaStart}&dtaend=${dtaEnd}`)
  },
  show (userId, auditoriaId) {
    return Api(userId).get(`auditoria/${auditoriaId}`)
  }
}

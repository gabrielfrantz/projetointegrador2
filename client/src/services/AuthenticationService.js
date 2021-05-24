import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  show (userId) {
    return Api(userId).get(`user/${userId}`)
  },
  put (user) {
    return Api(user.id).put(`user/${user.id}`, user)
  },
  view (userId, token) {
    return Api(userId, token).get('usersView')
  },
  permission (userId, user, token) {
    return Api(userId, token).put(`userPermission/${user.id.userId}`, user)
  }
}

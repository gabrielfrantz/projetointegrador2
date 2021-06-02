import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  show (userId, token) {
    return Api(userId, token).get(`user/${userId}`)
  },
  put (user, token) {
    return Api(user.id, token).put(`user/${user.id}`, user)
  },
  changePassword (user, token) {
    return Api(user.id, token).put('changePassword', user)
  },
  view (userId, token) {
    return Api(userId, token).get('usersView')
  },
  permission (userId, user, token) {
    return Api(userId, token).put(`userPermission/${user.id.userId}`, user)
  },
  forgot (userId, user, email) {
    return Api(userId, email).put(`forgot/${user.id.userId}`, email)
  }
}

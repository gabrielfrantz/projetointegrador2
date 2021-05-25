import axios from 'axios'

export default (userId, token) => {
  return axios.create({
    baseURL: 'http://177.44.248.25:8080/',
    headers: {
      Authorization: 'Bearer ' + token,
      common: {
        userId: userId
      }
    }
  })
}

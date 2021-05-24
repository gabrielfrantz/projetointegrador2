import axios from 'axios'

export default (userId, token) => {
  return axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      Authorization: 'Bearer ' + token,
      common: {
        userId: userId
      }
    }
  })
}

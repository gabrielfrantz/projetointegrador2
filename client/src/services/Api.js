import axios from 'axios'

export default (userId) => {
  return axios.create({
    baseURL: 'http://177.44.248.25:8080/',
    headers: {
      common: {
        userId: userId
      }
    }
  })
}

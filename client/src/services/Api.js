import axios from 'axios'

export default (userId) => {
  return axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      common: {
        userId: userId
      }
    }
  })
}

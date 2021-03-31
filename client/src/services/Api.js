import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://177.44.248.25:3391/'
  })
}

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.imedyapp.com.br'
})

export default api

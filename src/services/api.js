import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.imedyapp.com.br',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(null, function (error) {
  console.log(error)
  if (error.response.status === 401) {
    console.log('Failed to login')
    location.href = '/login'
  }
  return Promise.reject(error)
})

export default api

import axios from 'axios'
import { serverURL } from '../config/constants'

const axiosInstance = axios.create({
  baseURL: serverURL,
  withCredentials: true
})

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance

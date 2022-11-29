import router from '@/router'
import axios from 'axios'
import { Toast } from 'vant'
import { getToken, delToken } from './localstory'
// const request = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: { 'X-Custom-Header': 'foobar' }
// })
// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/',
  timeout: 5000,
  headers: { Authorization: `Bearer ${getToken}` }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const token = getToken()
  // 在发送请求之前做些什么
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  if (error.response.status === 401) {
    // 有错误响应, 提示错误提示
    Toast('token过期,请重新登录')
    delToken()
    router.push('/login')
  } else {
    Toast(error.response.data.message)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request

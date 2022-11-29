import request from '@/utils/request.js'
export const registerAPI = (data) => request.post('user/register', data)
export const loginAPI = (data) => request.post('user/login', data)
export const articleItemAPI = (data) => request.get('interview/query', { params: data })
export const articleDetailAPI = (data) => request.get('interview/show', { params: data })
export const likecollectAPI = (data) => request.post('interview/opt', data)
export const getlikecollectAPI = (data) => request.get('interview/opt/list', { params: data })
export const getUserAPI = () => request.get('/user/currentUser')

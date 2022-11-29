// 保存token
export const setToken = (token) => localStorage.setItem('token', token)
// 获取token
export const getToken = () => localStorage.getItem('token')

// 删除token
export const delToken = () => localStorage.removeItem('token')

// HTTP客户端配置，基于axios
import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

// API基础URL
const API_BASE_URL = 'http://localhost:1323/api/v1'

// 统一的API响应格式
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 创建axios实例
const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
client.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证token等
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
client.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 统一处理成功响应
    const { data } = response
    
    // 如果后端返回的code不为0，视为业务错误
    if (data.code !== 0) {
      throw new Error(data.message || '请求失败')
    }
    
    return response
  },
  (error: AxiosError) => {
    // 统一处理错误响应
    let message = '网络错误，请稍后重试'
    
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          // 可以在这里处理登录过期逻辑
          break
        case 403:
          message = '权限不足'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = (data as any)?.message || `请求失败 (${status})`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message = '网络连接超时，请检查网络'
    }
    
    console.error('API请求错误:', error)
    return Promise.reject(new Error(message))
  }
)

export default client
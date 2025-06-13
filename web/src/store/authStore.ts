// 用户认证状态管理
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 用户信息接口
export interface User {
  id: number
  username: string
  email: string
}

// 认证状态接口
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  setUser: (user: User) => void
}

// 创建认证状态store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // 登录
      login: (user: User) => {
        set({ user, isAuthenticated: true })
      },
      
      // 登出
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      // 设置用户信息
      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage', // 本地存储的key
    }
  )
)
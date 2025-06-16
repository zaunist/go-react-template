// 用户相关API接口
import client from "../lib/client";
import type { ApiResponse } from "../lib/client";

// 用户信息接口
export interface User {
  id: number;
  username: string;
  email: string;
}

// 注册请求参数
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// 登录请求参数
export interface LoginRequest {
  email: string;
  password: string;
}

// 用户API
export const userApi = {
  // 用户注册
  register: async (data: RegisterRequest): Promise<ApiResponse<User>> => {
    const response = await client.post<ApiResponse<User>>(
      "/v1/auth/register",
      data
    );
    return response.data;
  },

  // 用户登录
  login: async (data: LoginRequest): Promise<ApiResponse<User>> => {
    const response = await client.post<ApiResponse<User>>("/v1/auth/login", data);
    return response.data;
  },

  // 获取用户信息
  getProfile: async (id: number): Promise<ApiResponse<User>> => {
    const response = await client.get<ApiResponse<User>>(`/v1/user/profile/${id}`);
    return response.data;
  },
};

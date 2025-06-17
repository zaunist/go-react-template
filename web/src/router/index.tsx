// 路由配置
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout, SimpleLayout } from '../components/layout'
import { useAuthStore } from '../store/authStore'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import BlogPage from '../pages/BlogPage'
import BlogDetailPage from '../pages/BlogDetailPage'
import PrivacyPage from '../pages/PrivacyPage'
import TermsPage from '../pages/TermsPage'
import CookiesPage from '../pages/CookiesPage'


// 受保护的路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

// 公开路由组件（已登录用户重定向到仪表板）
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

// 路由配置
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'blog/:id',
        element: <BlogDetailPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'cookies',
        element: <CookiesPage />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <SimpleLayout />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
    ],
  },
])
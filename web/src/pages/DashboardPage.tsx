// 仪表板页面
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  // 处理登出
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">仪表板</h1>
          <p className="mt-2 text-gray-600">欢迎回来，{user?.username}！</p>
        </div>

        {/* 用户信息卡片 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>用户信息</CardTitle>
              <CardDescription>您的账户详细信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">用户ID：</span>
                <span className="text-gray-900">{user?.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">用户名：</span>
                <span className="text-gray-900">{user?.username}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">邮箱：</span>
                <span className="text-gray-900">{user?.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
              <CardDescription>常用功能快捷入口</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                编辑个人资料
              </Button>
              <Button variant="outline" className="w-full justify-start">
                修改密码
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                退出登录
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统状态</CardTitle>
              <CardDescription>应用运行状态</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">前端服务正常</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">后端API正常</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">数据库连接正常</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 欢迎信息 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>欢迎使用 Go + React 模板项目</CardTitle>
            <CardDescription>
              这是一个基于 Go Echo + React + TailwindCSS + Zustand 构建的全栈模板项目
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-3">技术栈特性：</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">后端技术：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Go 1.24+ 高性能后端</li>
                    <li>• Echo v4 轻量级Web框架</li>
                    <li>• GORM ORM框架</li>
                    <li>• SQLite 嵌入式数据库</li>
                    <li>• bcrypt 密码加密</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">前端技术：</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• React 19 现代前端框架</li>
                    <li>• TypeScript 类型安全</li>
                    <li>• TailwindCSS v4 原子化CSS</li>
                    <li>• Zustand 轻量级状态管理</li>
                    <li>• React Router DOM 路由管理</li>
                    <li>• shadcn/ui 现代UI组件库</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
// 仪表板页面
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function DashboardPage() {
  const { t } = useTranslation()
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
        {/* 语言切换器 */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="mt-2 text-gray-600">{t('dashboard.welcome', { username: user?.username })}</p>
        </div>

        {/* 用户信息卡片 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.userInfo')}</CardTitle>
              <CardDescription>{t('dashboard.userInfoDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">{t('dashboard.userId')}：</span>
                <span className="text-gray-900">{user?.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">{t('dashboard.username')}：</span>
                <span className="text-gray-900">{user?.username}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">{t('dashboard.email')}：</span>
                <span className="text-gray-900">{user?.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quickActions')}</CardTitle>
              <CardDescription>{t('dashboard.quickActionsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                {t('dashboard.editProfile')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                {t('dashboard.changePassword')}
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                {t('dashboard.logout')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.systemStatus')}</CardTitle>
              <CardDescription>{t('dashboard.systemStatusDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{t('dashboard.frontendServiceNormal')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{t('dashboard.backendApiNormal')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{t('dashboard.databaseConnectionNormal')}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 欢迎信息 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t('dashboard.welcomeTitle')}</CardTitle>
            <CardDescription>
              {t('dashboard.welcomeDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-3">{t('dashboard.techStackFeatures')}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('dashboard.backendTech')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('dashboard.goHighPerformance')}</li>
                    <li>• {t('dashboard.echoLightweight')}</li>
                    <li>• {t('dashboard.gormFramework')}</li>
                    <li>• {t('dashboard.sqliteDatabase')}</li>
                    <li>• {t('dashboard.bcryptEncryption')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('dashboard.frontendTech')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('dashboard.reactModern')}</li>
                    <li>• {t('dashboard.typescriptSafety')}</li>
                    <li>• {t('dashboard.tailwindAtomic')}</li>
                    <li>• {t('dashboard.zustandLightweight')}</li>
                    <li>• {t('dashboard.reactRouterDom')}</li>
                    <li>• {t('dashboard.shadcnUi')}</li>
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
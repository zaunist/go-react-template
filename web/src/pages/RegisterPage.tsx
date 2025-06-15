// 注册页面
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/authStore'
import { userApi, type RegisterRequest } from '../api'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function RegisterPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    // 清除错误信息
    if (error) setError('')
  }

  // 表单验证
  const validateForm = () => {
    if (formData.username.length < 3) {
      setError(t('auth.usernameTooShort'))
      return false
    }
    if (formData.password.length < 6) {
      setError(t('auth.passwordTooShort'))
      return false
    }
    if (formData.password !== confirmPassword) {
      setError(t('auth.passwordMismatch'))
      return false
    }
    return true
  }

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await userApi.register(formData)
      if (response.code === 0) {
        // 注册成功后自动登录
        login(response.data)
        navigate('/dashboard')
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.registerFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t('auth.register')}</CardTitle>
          <CardDescription className="text-center">
            {t('auth.registerDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.username')}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={t('auth.usernameRequired')}
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading}
                minLength={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('auth.emailRequired')}
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t('auth.passwordRequired')}
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder={t('auth.confirmPassword')}
                value={confirmPassword}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.register')}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{t('auth.alreadyHaveAccount')}</span>
            <Link 
              to="/login" 
              className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
            >
              {t('auth.login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
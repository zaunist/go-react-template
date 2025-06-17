// 登录页面
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { userApi, type LoginRequest } from "@/api";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LoginPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除错误信息
    if (error) setError("");
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await userApi.login(formData);
      if (response.code === 0) {
        // 保存token到localStorage
        localStorage.setItem("token", response.data.token);
        // 登录成功，保存用户信息
        login(response.data.user);
        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-gray-800 font-sans overflow-hidden relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-rose-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-l from-pink-200/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* 微噪点效果 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23000000%27 fill-opacity=%271%27%3E%3Ccircle cx=%277%27 cy=%277%27 r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      {/* 语言切换器 */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-rose-200/50 shadow-2xl shadow-rose-100/50">
          {/* 卡片光效 */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50/60 to-transparent rounded-lg"></div>

          <CardHeader className="space-y-1 relative z-10">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {t("auth.login")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {t("auth.loginDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  {t("auth.email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("auth.emailRequired")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="bg-white/70 border-rose-200/50 text-gray-800 placeholder-gray-500 focus:border-rose-300 focus:ring-rose-200/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  {t("auth.password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("auth.passwordRequired")}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="bg-white/70 border-rose-200/50 text-gray-800 placeholder-gray-500 focus:border-rose-300 focus:ring-rose-200/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {error && (
                <div className="text-sm text-red-700 bg-red-100/80 border border-red-200/50 p-3 rounded-md backdrop-blur-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 border border-rose-300 text-gray-800 font-medium py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-200/50 backdrop-blur-sm"
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? t("common.loading") : t("auth.login")}
                </span>
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-md"></div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">{t("auth.noAccount")}</span>
              <Link
                to="/register"
                className="ml-1 text-gray-700 hover:text-gray-800 font-medium transition-colors duration-300 underline underline-offset-2"
              >
                {t("auth.register")}
              </Link>
            </div>
          </CardContent>

          {/* 极细描边效果 */}
          <div className="absolute inset-0 rounded-lg border border-rose-200/30"></div>
        </Card>
      </div>
    </div>
  );
}

// 注册页面
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
import { userApi, type RegisterRequest } from "@/api";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // 清除错误信息
    if (error) setError("");
  };

  // 表单验证
  const validateForm = () => {
    if (formData.username.length < 3) {
      setError(t("auth.usernameTooShort"));
      return false;
    }
    if (formData.password.length < 6) {
      setError(t("auth.passwordTooShort"));
      return false;
    }
    if (formData.password !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return false;
    }
    return true;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await userApi.register(formData);
      if (response.code === 0) {
        // 注册成功，跳转到登录页面
        navigate("/login", {
          state: {
            message: "注册成功，请登录",
          },
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-100 text-gray-800 font-sans overflow-hidden relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-cyan-200/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* 微噪点效果 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%2306b6d4%27 fill-opacity=%271%27%3E%3Ccircle cx=%277%27 cy=%277%27 r=%271%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      {/* 语言切换器 */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-emerald-200/50 shadow-2xl shadow-emerald-500/10">
          {/* 卡片光效 */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-lg"></div>

          <CardHeader className="space-y-1 relative z-10">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {t("auth.register")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {t("auth.registerDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  {t("auth.username")}
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t("auth.usernameRequired")}
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  minLength={3}
                  className="bg-white/60 border-emerald-200/60 text-gray-800 placeholder-gray-500 focus:border-emerald-400 focus:ring-emerald-400/30 transition-all duration-300"
                />
              </div>

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
                  className="bg-white/60 border-emerald-200/60 text-gray-800 placeholder-gray-500 focus:border-emerald-400 focus:ring-emerald-400/30 transition-all duration-300"
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
                  minLength={6}
                  className="bg-white/60 border-emerald-200/60 text-gray-800 placeholder-gray-500 focus:border-emerald-400 focus:ring-emerald-400/30 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-medium"
                >
                  {t("auth.confirmPassword")}
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder={t("auth.confirmPassword")}
                  value={confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="bg-white/60 border-emerald-200/60 text-gray-800 placeholder-gray-500 focus:border-emerald-400 focus:ring-emerald-400/30 transition-all duration-300"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50/80 border border-red-200/60 p-3 rounded-md backdrop-blur-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border border-emerald-400 text-white font-medium py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30"
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? t("common.loading") : t("auth.register")}
                </span>
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-md"></div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">
                {t("auth.alreadyHaveAccount")}
              </span>
              <Link
                to="/login"
                className="ml-1 text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-300 underline underline-offset-2"
              >
                {t("auth.login")}
              </Link>
            </div>
          </CardContent>

          {/* 极细描边效果 */}
          <div className="absolute inset-0 rounded-lg border border-emerald-300/30"></div>
        </Card>
      </div>
    </div>
  );
}

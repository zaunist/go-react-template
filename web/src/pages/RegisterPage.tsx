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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-200 font-sans overflow-hidden relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-transparent dark:from-blue-900/20 dark:via-purple-900/20 dark:to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-200/25 via-orange-100/20 to-transparent dark:from-purple-900/25 dark:from-blue-900/20 dark:to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/20 via-orange-50/30 to-yellow-100/20 dark:from-indigo-900/20 dark:via-purple-900/30 dark:to-blue-900/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* 微噪点效果 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23f59e0b%27 fill-opacity=%271%27%3E%3Ccircle cx=%277%27 cy=%277%27 r=%270.5%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>

        {/* 极细描边网格 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* 暗色主题网格 */}
        <div
          className="absolute inset-0 opacity-[0.03] hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-orange-200/50 dark:border-slate-700/50 shadow-2xl shadow-orange-100/50 dark:shadow-slate-900/50">
          {/* 卡片光效 */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/60 to-transparent dark:from-slate-700/60 dark:to-transparent rounded-lg"></div>

          <CardHeader className="space-y-1 relative z-10">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
              {t("auth.register")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              {t("auth.registerDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
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
                  className="bg-white/70 dark:bg-slate-700/70 border-orange-200/50 dark:border-slate-600/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-400 focus:ring-orange-200/50 dark:focus:ring-orange-300/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
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
                  className="bg-white/70 dark:bg-slate-700/70 border-orange-200/50 dark:border-slate-600/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-400 focus:ring-orange-200/50 dark:focus:ring-orange-300/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-700 dark:text-gray-300 font-medium"
                >
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
                  className="bg-white/70 dark:bg-slate-700/70 border-orange-200/50 dark:border-slate-600/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-400 focus:ring-orange-200/50 dark:focus:ring-orange-300/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 dark:text-gray-300 font-medium"
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
                  className="bg-white/70 dark:bg-slate-700/70 border-orange-200/50 dark:border-slate-600/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-300 dark:focus:border-orange-400 focus:ring-orange-200/50 dark:focus:ring-orange-300/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {error && (
                <div className="text-sm text-red-700 dark:text-red-300 bg-red-100/80 dark:bg-red-900/30 border border-red-200/50 dark:border-red-500/30 p-3 rounded-md backdrop-blur-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-200 to-amber-200 hover:from-orange-300 hover:to-amber-300 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 border border-orange-300 dark:border-orange-500 text-gray-800 dark:text-white font-medium py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-200/50 dark:hover:shadow-orange-800/50 backdrop-blur-sm"
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
              <span className="text-gray-600 dark:text-gray-400">
                {t("auth.alreadyHaveAccount")}
              </span>
              <Link
                to="/login"
                className="ml-1 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200 font-medium transition-colors duration-300 underline underline-offset-2"
              >
                {t("auth.login")}
              </Link>
            </div>
          </CardContent>

          {/* 极细描边效果 */}
          <div className="absolute inset-0 rounded-lg border border-orange-300/30 dark:border-slate-700/30"></div>
        </Card>
      </div>
    </div>
  );
}

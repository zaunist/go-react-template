// 仪表板页面
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-25 to-green-50 text-gray-800 font-sans overflow-hidden relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/5 left-1/5 w-96 h-96 bg-gradient-to-r from-emerald-200/30 via-teal-100/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/5 right-1/5 w-80 h-80 bg-gradient-to-l from-green-200/25 via-emerald-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-gradient-to-r from-teal-200/20 via-mint-100/15 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* 微噪点效果 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%2310b981%27 fill-opacity=%271%27%3E%3Ccircle cx=%277%27 cy=%277%27 r=%270.5%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
              {t("dashboard.title")}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {t("dashboard.welcome", { username: user?.username })}
            </p>
          </div>

          {/* 用户信息卡片 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-100/50">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-gray-800">
                  {t("dashboard.userInfo")}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t("dashboard.userInfoDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    {t("dashboard.userId")}：
                  </span>
                  <span className="text-gray-800 font-mono text-sm bg-emerald-100/80 px-2 py-1 rounded backdrop-blur-sm">
                    {user?.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    {t("dashboard.username")}：
                  </span>
                  <span className="text-gray-800">{user?.username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    {t("dashboard.email")}：
                  </span>
                  <span className="text-gray-800 text-sm">{user?.email}</span>
                </div>
              </CardContent>
              <div className="absolute inset-0 rounded-lg border border-emerald-200/30 group-hover:border-emerald-300/50 transition-colors duration-500"></div>
            </Card>

            <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-cyan-200/50 hover:border-cyan-300/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-100/50">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 to-sky-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-gray-800">
                  {t("dashboard.systemStatus")}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t("dashboard.systemStatusDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-700">
                    {t("dashboard.frontendServiceNormal")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-700">
                    {t("dashboard.backendApiNormal")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-700 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-700">
                    {t("dashboard.databaseConnectionNormal")}
                  </span>
                </div>
              </CardContent>
              <div className="absolute inset-0 rounded-lg border border-cyan-200/30 group-hover:border-cyan-300/50 transition-colors duration-500"></div>
            </Card>
          </div>

          {/* 技术栈信息 */}
          <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/50 hover:border-slate-300/70 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-gray-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-gray-800 text-2xl">
                {t("dashboard.welcomeTitle")}
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                {t("dashboard.welcomeDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">
                  {t("dashboard.techStackFeatures")}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 mb-4 text-lg">
                      {t("dashboard.backendTech")}
                    </h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {t("dashboard.goHighPerformance")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {t("dashboard.echoLightweight")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {t("dashboard.gormFramework")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {t("dashboard.sqliteDatabase")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {t("dashboard.bcryptEncryption")}
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 mb-4 text-lg">
                      {t("dashboard.frontendTech")}
                    </h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {t("dashboard.reactModern")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {t("dashboard.typescriptSafety")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {t("dashboard.tailwindAtomic")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {t("dashboard.zustandLightweight")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {t("dashboard.reactRouterDom")}
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        {t("dashboard.shadcnUi")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="absolute inset-0 rounded-lg border border-slate-200/30 group-hover:border-slate-300/50 transition-colors duration-500"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

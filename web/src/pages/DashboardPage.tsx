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

      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
              {t("dashboard.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
              {t("dashboard.welcome", { username: user?.username })}
            </p>
          </div>

          {/* 用户信息卡片 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-orange-200/50 dark:border-slate-700/50 hover:border-orange-300/70 dark:hover:border-slate-600/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-100/50 dark:hover:shadow-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-amber-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-gray-800 dark:text-gray-200">
                  {t("dashboard.userInfo")}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {t("dashboard.userInfoDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("dashboard.userId")}：
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-mono text-sm bg-orange-100/80 dark:bg-slate-700/80 px-2 py-1 rounded backdrop-blur-sm">
                    {user?.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("dashboard.username")}：
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {user?.username}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {t("dashboard.email")}：
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 text-sm">
                    {user?.email}
                  </span>
                </div>
              </CardContent>
              <div className="absolute inset-0 rounded-lg border border-orange-200/30 dark:border-slate-700/30 group-hover:border-orange-300/50 dark:group-hover:border-slate-600/50 transition-colors duration-500"></div>
            </Card>

            <Card className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-cyan-200/50 dark:border-slate-700/50 hover:border-cyan-300/70 dark:hover:border-slate-600/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-100/50 dark:hover:shadow-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 to-sky-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-gray-800 dark:text-gray-200">
                  {t("dashboard.systemStatus")}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {t("dashboard.systemStatusDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t("dashboard.frontendServiceNormal")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t("dashboard.backendApiNormal")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-700 shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t("dashboard.databaseConnectionNormal")}
                  </span>
                </div>
              </CardContent>
              <div className="absolute inset-0 rounded-lg border border-cyan-200/30 dark:border-slate-700/30 group-hover:border-cyan-300/50 dark:group-hover:border-slate-600/50 transition-colors duration-500"></div>
            </Card>
          </div>

          {/* 技术栈信息 */}
          <Card className="group relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300/70 dark:hover:border-slate-600/70 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-gray-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-gray-800 dark:text-gray-200 text-2xl">
                {t("dashboard.welcomeTitle")}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
                {t("dashboard.welcomeDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  {t("dashboard.techStackFeatures")}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4 text-lg">
                      {t("dashboard.backendTech")}
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-3">
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
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4 text-lg">
                      {t("dashboard.frontendTech")}
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-3">
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
            <div className="absolute inset-0 rounded-lg border border-slate-200/30 dark:border-slate-700/30 group-hover:border-slate-300/50 dark:group-hover:border-slate-600/50 transition-colors duration-500"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

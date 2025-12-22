// 主页
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Code, Database, Globe, Zap } from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Code,
      title: t("home.modernTechStack"),
      description: t("home.modernTechStackDesc"),
      gradient: "from-blue-50 to-indigo-100",
      iconColor: "text-indigo-600",
      shadowColor: "shadow-blue-100/50",
    },
    {
      icon: Zap,
      title: t("home.highPerformance"),
      description: t("home.highPerformanceDesc"),
      gradient: "from-purple-50 to-pink-100",
      iconColor: "text-purple-600",
      shadowColor: "shadow-purple-100/50",
    },
    {
      icon: Database,
      title: t("home.completeAuth"),
      description: t("home.completeAuthDesc"),
      gradient: "from-cyan-50 to-blue-100",
      iconColor: "text-cyan-600",
      shadowColor: "shadow-cyan-100/50",
    },
    {
      icon: Globe,
      title: t("home.i18nSupport"),
      description: t("home.i18nSupportDesc"),
      gradient: "from-emerald-50 to-teal-100",
      iconColor: "text-emerald-600",
      shadowColor: "shadow-emerald-100/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-200 font-sans overflow-hidden relative">
      {/* 背景装饰 - 简化版，减少 DOM 节点和动画开销 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 简化的渐变背景效果 */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            {t("home.title")}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("home.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 transition-all duration-200 hover:scale-105 hover:shadow-lg px-8 py-4 text-lg font-medium border-0"
              >
                <span className="flex items-center gap-2">
                  {t("home.getStarted")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50/80 dark:hover:bg-slate-700/80 transition-all duration-200 hover:scale-105 hover:shadow-md px-8 py-4 text-lg font-medium"
              >
                {t("home.learnMore")}
              </Button>
            </Link>
          </div>
        </div>

        {/* 特性卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className={`group bg-gradient-to-br ${feature.gradient} dark:from-slate-800 dark:to-slate-900 border border-white/40 dark:border-slate-700/40 backdrop-blur-sm hover:border-white/60 dark:hover:border-slate-600/60 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${feature.shadowColor} dark:shadow-slate-900/50`}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-700/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-md">
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 底部信息 */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {t("home.builtWith")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm"></div>
            <span className="text-gray-400 dark:text-gray-500 text-xs font-medium">
              {t("home.systemStatus")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 text-gray-800 font-sans overflow-hidden relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-200/25 via-orange-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/20 via-orange-50/30 to-yellow-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>

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
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="relative">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
              {t("home.title")}
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent blur-sm opacity-30">
              {t("home.title")}
            </div>
          </div>

          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("home.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/50 px-8 py-4 text-lg font-medium border-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("home.getStarted")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-200 bg-white/80 backdrop-blur-md text-orange-600 hover:bg-orange-50/80 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-100/50 px-8 py-4 text-lg font-medium"
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
                className={`group relative overflow-hidden bg-gradient-to-br ${feature.gradient} border border-white/40 backdrop-blur-sm hover:border-white/60 transition-all duration-500 hover:scale-105 hover:shadow-xl ${feature.shadowColor}`}
              >
                {/* 卡片光效 */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <CardTitle className="text-gray-800 text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* 极细描边效果 */}
                <div className="absolute inset-0 rounded-lg border border-white/30 group-hover:border-white/50 transition-colors duration-500"></div>
              </Card>
            );
          })}
        </div>

        {/* 底部信息 */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm font-medium">
            {t("home.builtWith")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-200"></div>
            <span className="text-gray-400 text-xs font-medium">
              {t("home.systemStatus")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

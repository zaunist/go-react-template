import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-transparent dark:from-orange-500/10 dark:via-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-200/25 via-orange-100/20 to-transparent dark:from-yellow-500/10 dark:via-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* 微噪点效果 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
                <defs>
                  <pattern id='noise' width='100' height='100' patternUnits='userSpaceOnUse'>
                    <circle cx='25' cy='25' r='0.5' fill='%23e2e8f0' opacity='0.3'/>
                    <circle cx='75' cy='45' r='0.3' fill='%23cbd5e1' opacity='0.2'/>
                    <circle cx='45' cy='75' r='0.4' fill='%23f1f5f9' opacity='0.4'/>
                    <circle cx='85' cy='85' r='0.2' fill='%23e2e8f0' opacity='0.3'/>
                    <circle cx='15' cy='65' r='0.3' fill='%23cbd5e1' opacity='0.2'/>
                  </pattern>
                </defs>
                <rect width='100' height='100' fill='url(%23noise)'/>
              </svg>
            `)}`,
          }}
        />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link to="/">
            <Button
              variant="outline"
              className="border-orange-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-orange-600 dark:text-orange-400 hover:bg-orange-50/80 dark:hover:bg-slate-700/80 hover:border-orange-300 dark:hover:border-slate-600 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Cookie 政策
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            最后更新时间：{new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>

        {/* 内容区域 */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              什么是 Cookie？
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Cookie
              是当您访问网站时存储在您设备上的小型文本文件。它们被广泛用于使网站工作或更高效地工作，以及向网站所有者提供信息。
            </p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              我们如何使用 Cookie
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              我们使用 Cookie 来：
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>保持您的登录状态</li>
              <li>记住您的偏好设置</li>
              <li>分析网站使用情况</li>
              <li>改善用户体验</li>
              <li>提供个性化内容</li>
            </ul>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Cookie 类型
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                  必要 Cookie
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  这些 Cookie
                  对于网站的基本功能是必需的，包括用户身份验证和安全功能。没有这些
                  Cookie，网站无法正常运行。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                  功能性 Cookie
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  这些 Cookie
                  允许网站记住您的选择（如用户名、语言或地区），并提供增强的个性化功能。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2 text-gray-800 dark:text-gray-200">
                  分析 Cookie
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  这些 Cookie
                  帮助我们了解访问者如何与网站互动，通过匿名收集和报告信息来改善网站性能。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              第三方 Cookie
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              我们可能使用第三方服务，这些服务也会设置 Cookie：
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Google Analytics - 用于网站分析</li>
              <li>社交媒体插件 - 用于内容分享</li>
              <li>CDN 服务 - 用于内容分发</li>
            </ul>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              管理 Cookie
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              您可以通过以下方式控制和管理 Cookie：
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>通过浏览器设置删除或阻止 Cookie</li>
              <li>设置浏览器在设置 Cookie 前通知您</li>
              <li>使用浏览器的隐私模式</li>
              <li>使用第三方 Cookie 管理工具</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              请注意，禁用某些 Cookie 可能会影响网站的功能和您的用户体验。
            </p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Cookie 保留期
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              不同类型的 Cookie 有不同的保留期：
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-4">
              <li>
                <strong>会话 Cookie</strong>：在您关闭浏览器时自动删除
              </li>
              <li>
                <strong>持久 Cookie</strong>：在设定的到期日期或您手动删除时删除
              </li>
              <li>
                <strong>身份验证 Cookie</strong>：通常在 30 天后过期
              </li>
            </ul>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              联系我们
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              如果您对我们的 Cookie 政策有任何疑问，请联系我们：
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              邮箱：y.bz@foxmail.com
            </p>
          </div>
        </div>
      </div>

      {/* 极细描边效果 */}
      <div className="absolute inset-0 border border-orange-200/30 dark:border-slate-700/30 pointer-events-none"></div>
    </div>
  );
}

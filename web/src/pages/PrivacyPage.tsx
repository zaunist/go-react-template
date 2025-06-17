import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 text-gray-800 font-sans">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-200/25 via-orange-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
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
            `)}`
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
              className="border-orange-200 bg-white/80 backdrop-blur-md text-orange-600 hover:bg-orange-50/80 hover:border-orange-300 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            隐私政策
          </h1>
          <p className="text-gray-600 text-lg">
            最后更新时间：{new Date().toLocaleDateString('zh-CN')}
          </p>
        </div>

        {/* 内容区域 */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. 信息收集</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              我们收集您在使用我们服务时提供的信息，包括但不限于：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>账户信息（用户名、邮箱地址等）</li>
              <li>使用数据（访问日志、操作记录等）</li>
              <li>设备信息（IP地址、浏览器类型等）</li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. 信息使用</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              我们使用收集的信息用于：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>提供和改进我们的服务</li>
              <li>处理您的请求和交易</li>
              <li>发送重要通知和更新</li>
              <li>确保服务安全和防止欺诈</li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. 信息保护</h2>
            <p className="text-gray-700 leading-relaxed">
              我们采用行业标准的安全措施来保护您的个人信息，包括加密存储、访问控制和定期安全审计。我们不会向第三方出售、交易或转让您的个人信息。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Cookie 使用</h2>
            <p className="text-gray-700 leading-relaxed">
              我们使用 Cookie 和类似技术来改善用户体验、分析网站使用情况和提供个性化内容。您可以通过浏览器设置控制 Cookie 的使用。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. 您的权利</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              您有权：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>访问和更新您的个人信息</li>
              <li>删除您的账户和相关数据</li>
              <li>限制或反对某些数据处理</li>
              <li>数据可携带性</li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. 联系我们</h2>
            <p className="text-gray-700 leading-relaxed">
              如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
            </p>
            <p className="text-gray-700 mt-4">
              邮箱：y.bz@foxmail.com
            </p>
          </div>
        </div>
      </div>

      {/* 极细描边效果 */}
      <div className="absolute inset-0 border border-orange-200/30 pointer-events-none"></div>
    </div>
  );
}
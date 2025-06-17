import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
            服务条款
          </h1>
          <p className="text-gray-600 text-lg">
            最后更新时间：{new Date().toLocaleDateString('zh-CN')}
          </p>
        </div>

        {/* 内容区域 */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. 服务条款的接受</h2>
            <p className="text-gray-700 leading-relaxed">
              通过访问和使用本网站及其服务，您同意遵守并受本服务条款的约束。如果您不同意这些条款，请不要使用我们的服务。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. 服务描述</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Go-React Template 是一个现代化的全栈开发模板，提供以下服务：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>用户注册和身份验证</li>
              <li>数据管理和存储</li>
              <li>API 接口服务</li>
              <li>前端界面和用户体验</li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. 用户责任</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              作为用户，您同意：
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>提供准确、完整的注册信息</li>
              <li>保护您的账户安全和密码</li>
              <li>不进行任何非法或有害的活动</li>
              <li>遵守所有适用的法律法规</li>
              <li>不干扰或破坏服务的正常运行</li>
            </ul>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. 知识产权</h2>
            <p className="text-gray-700 leading-relaxed">
              本网站及其内容（包括但不限于文本、图像、代码、设计）受版权法和其他知识产权法保护。未经明确授权，您不得复制、修改、分发或以其他方式使用这些内容。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. 服务可用性</h2>
            <p className="text-gray-700 leading-relaxed">
              我们努力确保服务的持续可用性，但不保证服务不会中断。我们可能因维护、更新或其他原因暂时中断服务，并会尽力提前通知用户。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. 免责声明</h2>
            <p className="text-gray-700 leading-relaxed">
              本服务按"现状"提供，我们不对服务的准确性、完整性或可靠性做出任何明示或暗示的保证。在法律允许的最大范围内，我们不承担任何直接、间接、偶然或后果性损害的责任。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. 条款修改</h2>
            <p className="text-gray-700 leading-relaxed">
              我们保留随时修改这些服务条款的权利。重大变更将通过网站公告或电子邮件通知用户。继续使用服务即表示您接受修改后的条款。
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 rounded-lg p-8 shadow-lg shadow-orange-100/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. 联系信息</h2>
            <p className="text-gray-700 leading-relaxed">
              如果您对这些服务条款有任何疑问，请联系我们：
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
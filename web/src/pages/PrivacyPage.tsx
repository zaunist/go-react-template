import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
              Back to Home
            </Button>
          </Link>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
        </div>

        {/* 内容区域 */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              1. Information Collection
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We collect information you provide when using our services,
              including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Account information (username, email address, etc.)</li>
              <li>Usage data (access logs, operation records, etc.)</li>
              <li>Device information (IP address, browser type, etc.)</li>
            </ul>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              2. Information Usage
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Provide and improve our services</li>
              <li>Process your requests and transactions</li>
              <li>Send important notifications and updates</li>
              <li>Ensure service security and prevent fraud</li>
            </ul>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              3. Information Protection
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We employ industry-standard security measures to protect your
              personal information, including encrypted storage, access control,
              and regular security audits. We do not sell, trade, or transfer
              your personal information to third parties.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              4. Cookie Usage
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use Cookies and similar technologies to improve user
              experience, analyze website usage, and provide personalized
              content. You can control the use of Cookies through your browser
              settings.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 mb-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              5. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Access and update your personal information</li>
              <li>Delete your account and related data</li>
              <li>Restrict or object to certain data processing</li>
              <li>Data portability</li>
            </ul>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-200/50 dark:border-slate-700/50 rounded-lg p-8 shadow-lg shadow-orange-100/50 dark:shadow-slate-900/50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              6. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy or need to
              exercise your rights, please contact us via:
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              Email: y.bz@foxmail.com
            </p>
          </div>
        </div>
      </div>

      {/* 极细描边效果 */}
      <div className="absolute inset-0 border border-orange-200/30 dark:border-slate-700/30 pointer-events-none"></div>
    </div>
  );
}

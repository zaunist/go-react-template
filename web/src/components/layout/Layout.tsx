import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/sonner";

// 加载组件
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
    <div className="relative">
      {/* 旋转圆环 */}
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>

      {/* 内部光点 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      </div>

      {/* 外发光效果 */}
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-orange-400/50 rounded-full animate-spin blur-sm"></div>
    </div>
  </div>
);

// 错误边界组件
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Layout Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white/80 backdrop-blur-xl border border-orange-200/50 rounded-lg p-8 shadow-2xl">
              <div className="w-16 h-16 bg-red-100/80 border border-red-300/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">⚠</span>
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                出现了一些问题
              </h2>

              <p className="text-slate-600 text-sm mb-6">
                页面加载时发生错误，请刷新页面重试。
              </p>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-orange-100/80 hover:bg-orange-200/80 border border-orange-300/50 text-slate-800 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              >
                刷新页面
              </button>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="text-slate-600 text-xs cursor-pointer hover:text-slate-700">
                    错误详情 (开发模式)
                  </summary>
                  <pre className="mt-2 text-xs text-red-700 bg-red-50/80 border border-red-200/50 rounded p-2 overflow-auto max-h-32">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 主布局组件
export const Layout: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col">
        {/* 背景装饰 */}
        <div
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
                <defs>
                  <pattern id='noise' width='200' height='200' patternUnits='userSpaceOnUse'>
                    <circle cx='40' cy='40' r='0.8' fill='%23f97316' opacity='0.1'/>
                    <circle cx='160' cy='80' r='0.6' fill='%23f59e0b' opacity='0.1'/>
                    <circle cx='80' cy='160' r='0.7' fill='%23eab308' opacity='0.1'/>
                    <circle cx='180' cy='180' r='0.4' fill='%23f97316' opacity='0.1'/>
                    <circle cx='20' cy='120' r='0.5' fill='%23f59e0b' opacity='0.1'/>
                    <circle cx='120' cy='20' r='0.6' fill='%23eab308' opacity='0.1'/>
                    <circle cx='100' cy='100' r='0.3' fill='%23f97316' opacity='0.1'/>
                  </pattern>
                </defs>
                <rect width='200' height='200' fill='url(%23noise)'/>
              </svg>
            `)}`,
          }}
        />

        {/* 流光效果 */}
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent pointer-events-none"></div>

        {/* 动态流光效果 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-l from-transparent via-amber-200/20 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* 头部导航 */}
        <Header />

        {/* 主要内容区域 */}
        <main className="flex-1 relative z-10">
          <div className="pt-16">
            {" "}
            {/* 为固定头部留出空间 */}
            <Suspense fallback={<LoadingSpinner />}>
              <Outlet />
            </Suspense>
          </div>
        </main>

        {/* 底部 */}
        <Footer />

        {/* 全局通知 */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(251, 146, 60, 0.3)",
              color: "#1e293b",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

// 简单布局组件（用于登录、注册等不需要导航的页面）
export const SimpleLayout: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-slate-800">
        {/* 背景装饰 */}
        <div
          className="fixed inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
              <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
                <defs>
                  <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
                    <path d='M 40 0 L 0 0 0 40' fill='none' stroke='%23fb923c' stroke-width='0.5' opacity='0.4'/>
                  </pattern>
                </defs>
                <rect width='200' height='200' fill='url(%23grid)'/>
              </svg>
            `)}`,
          }}
        />

        {/* 流光效果 */}
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent pointer-events-none"></div>
        <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent pointer-events-none"></div>

        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>

        {/* 全局通知 */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(251, 146, 60, 0.3)",
              color: "#1e293b",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;

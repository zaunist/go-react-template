import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/store/authStore";
import { Home, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: t("nav.home"), icon: Home },
    ...(user
      ? [{ path: "/dashboard", label: t("nav.dashboard"), icon: User }]
      : []),
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-50/95 via-white/95 to-orange-50/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 backdrop-blur-xl border-b border-orange-200/50 dark:border-slate-700/50 shadow-lg shadow-orange-200/20 dark:shadow-slate-900/20">
      {/* 背景装饰 */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
              <defs>
                <pattern id='noise' width='100' height='100' patternUnits='userSpaceOnUse'>
                  <circle cx='20' cy='20' r='0.5' fill='%23e2e8f0' opacity='0.3'/>
                  <circle cx='80' cy='40' r='0.3' fill='%23cbd5e1' opacity='0.2'/>
                  <circle cx='40' cy='80' r='0.4' fill='%23f1f5f9' opacity='0.4'/>
                  <circle cx='90' cy='90' r='0.2' fill='%23e2e8f0' opacity='0.3'/>
                  <circle cx='10' cy='60' r='0.3' fill='%23cbd5e1' opacity='0.2'/>
                </pattern>
              </defs>
              <rect width='100' height='100' fill='url(%23noise)'/>
            </svg>
          `)}`,
        }}
      />

      {/* 流光效果 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center border border-slate-300/50 dark:border-slate-600/50 shadow-sm">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                GT
              </span>
            </div>
            <span className="font-semibold text-lg hidden sm:block dark:text-slate-200">
              Go-React Template
            </span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive(path)
                      ? "bg-orange-100/30 dark:bg-slate-700/30 text-slate-800 dark:text-slate-200 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-orange-50/40 dark:hover:bg-slate-700/40"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-3">
            {/* 主题切换器 */}
            <ThemeToggle />

            {/* 语言切换器 */}
            <LanguageSwitcher />

            {/* 用户操作 */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {t("common.welcome")}, {user.username}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="bg-orange-100/50 dark:bg-slate-700/50 border-orange-300/50 dark:border-slate-600/50 text-slate-600 dark:text-slate-300 hover:bg-orange-200/50 dark:hover:bg-slate-600/50 hover:text-slate-800 dark:hover:text-slate-100 hover:border-orange-400 dark:hover:border-slate-500 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {t("auth.logout")}
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-orange-100/50 dark:bg-slate-700/50 border-orange-300/50 dark:border-slate-600/50 text-slate-600 dark:text-slate-300 hover:bg-orange-200/50 dark:hover:bg-slate-600/50 hover:text-slate-800 dark:hover:text-slate-100 hover:border-orange-400 dark:hover:border-slate-500 transition-all duration-300"
                  >
                    {t("auth.login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-orange-500/90 dark:bg-orange-600/90 text-white hover:bg-orange-600/90 dark:hover:bg-orange-700/90 transition-all duration-300 hover:scale-105 shadow-sm"
                  >
                    {t("auth.register")}
                  </Button>
                </Link>
              </div>
            )}

            {/* 移动端菜单按钮 */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden bg-slate-100/50 dark:bg-slate-700/50 border-slate-300/50 dark:border-slate-600/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-600/50 hover:text-slate-800 dark:hover:text-slate-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      isActive(path)
                        ? "bg-orange-100/30 dark:bg-slate-700/30 text-slate-800 dark:text-slate-200 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-orange-50/40 dark:hover:bg-slate-700/40"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}

              {/* 移动端用户操作 */}
              {user ? (
                <div className="pt-2 border-t border-slate-200/50">
                  <div className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400">
                    {t("common.welcome")}, {user.username}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("auth.logout")}</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-slate-200/50 space-y-1">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                  >
                    {t("auth.login")}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                  >
                    {t("auth.register")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 极细描边效果 */}
      <div className="absolute inset-0 rounded-lg border border-gray-600/20 pointer-events-none"></div>
    </header>
  );
};

export default Header;

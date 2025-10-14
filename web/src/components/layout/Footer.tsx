import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Github, Mail, Globe, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: "#features" },
        { label: t("footer.pricing"), href: "#pricing" },
        { label: t("footer.documentation"), href: "#docs" },
        { label: t("footer.api"), href: "#api" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "#about" },
        { label: t("footer.careers"), href: "#careers" },
        { label: t("footer.contact"), href: "#contact" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.helpCenter"), href: "#help" },
        { label: t("footer.community"), href: "#community" },
        { label: t("footer.status"), href: "#status" },
        { label: t("footer.feedback"), href: "#feedback" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/zaunist/go-react-template",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:y.bz@foxmail.com",
      label: "Email",
    },
    {
      icon: Globe,
      href: "https://ajie.lu",
      label: "Website",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-orange-50 via-white to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-orange-200/50 dark:border-slate-700/50">
      {/* 背景装饰 */}
      <div
        className="absolute inset-0 opacity-40"
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

      {/* 流光效果 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容区 */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* 品牌信息 */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 transition-colors duration-300 mb-4"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center border border-slate-300/50 dark:border-slate-600/50 shadow-sm">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    GT
                  </span>
                </div>
                <span className="font-semibold text-lg dark:text-slate-200">
                  Go-React Template
                </span>
              </Link>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
                {t("footer.description")}
              </p>

              {/* 社交链接 */}
              <div className="flex items-center space-x-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100/50 dark:bg-slate-700/50 hover:bg-slate-200/50 dark:hover:bg-slate-600/50 border border-slate-300/50 dark:border-slate-600/50 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-300 hover:scale-105 shadow-sm"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* 链接列 */}
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-300 text-sm hover:underline underline-offset-2"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-slate-200/50 dark:border-slate-700/50"></div>

        {/* 底部信息 */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
              <span>© {currentYear} Go-React-Template </span>
              <span className="flex items-center space-x-1">
                <span>{t("footer.madeWith")}</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>{t("footer.by")} Alan</span>
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/privacy"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-300 hover:underline underline-offset-2"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                to="/terms"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-300 hover:underline underline-offset-2"
              >
                {t("footer.terms")}
              </Link>
              <Link
                to="/cookies"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors duration-300 hover:underline underline-offset-2"
              >
                {t("footer.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 极细描边效果 */}
      <div className="absolute inset-0 border border-gray-600/20 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 导入语言资源
import zhCN from "./locales/zh-CN.json";
import enUS from "./locales/en-US.json";

// 语言资源配置
const resources = {
  "zh-CN": {
    translation: zhCN,
  },
  "en-US": {
    translation: enUS,
  },
};

// 初始化 i18n
i18n
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources,
    fallbackLng: "zh-CN", // 默认语言
    debug: process.env.NODE_ENV === "development",

    // 语言检测配置
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },

    // 命名空间配置
    defaultNS: "translation",
    ns: ["translation"],
  });

export default i18n;

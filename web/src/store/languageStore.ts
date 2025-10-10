import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// 支持的语言类型
export type Language = "zh-CN" | "en-US";

// 语言配置
export const LANGUAGES = {
  "zh-CN": {
    name: "中文",
    flag: "🇨🇳",
  },
  "en-US": {
    name: "English",
    flag: "🇺🇸",
  },
} as const;

// 语言状态接口
interface LanguageState {
  // 当前语言
  currentLanguage: Language;

  // 可用语言列表
  availableLanguages: Language[];

  // 操作方法
  setLanguage: (language: Language) => void;
  getLanguageConfig: (language: Language) => (typeof LANGUAGES)[Language];
  toggleLanguage: () => void;
}

// 创建语言状态管理
export const useLanguageStore = create<LanguageState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // 初始状态
        currentLanguage: "zh-CN",
        availableLanguages: ["zh-CN", "en-US"],

        // 设置语言
        setLanguage: (language) => {
          set((state) => {
            state.currentLanguage = language;
          });

          // 更新 HTML lang 属性
          document.documentElement.lang = language;

          // 触发自定义事件，通知其他组件语言已更改
          window.dispatchEvent(
            new CustomEvent("languageChanged", {
              detail: { language },
            })
          );
        },

        // 获取语言配置
        getLanguageConfig: (language) => {
          return LANGUAGES[language];
        },

        // 切换语言（在两种语言间切换）
        toggleLanguage: () => {
          const { currentLanguage, setLanguage } = get();
          const newLanguage = currentLanguage === "zh-CN" ? "en-US" : "zh-CN";
          setLanguage(newLanguage);
        },
      })),
      {
        name: "language-store", // 本地存储的键名
        partialize: (state) => ({ currentLanguage: state.currentLanguage }), // 只持久化当前语言
      }
    ),
    {
      name: "language-store", // DevTools 中显示的名称
    }
  )
);

// 语言切换 Hook
export const useLanguage = () => {
  const { currentLanguage, setLanguage, getLanguageConfig, toggleLanguage } =
    useLanguageStore();

  return {
    currentLanguage,
    setLanguage,
    getLanguageConfig,
    toggleLanguage,
    isZhCN: currentLanguage === "zh-CN",
    isEnUS: currentLanguage === "en-US",
  };
};

// 初始化语言设置
export const initializeLanguage = () => {
  const { currentLanguage } = useLanguageStore.getState();

  // 设置 HTML lang 属性
  document.documentElement.lang = currentLanguage;

  // 可以在这里添加其他初始化逻辑，比如设置 dayjs 的语言等
};

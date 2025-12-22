import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// 自定义插件：为入口 JS 文件添加 modulepreload
function modulePreloadPlugin(): Plugin {
  return {
    name: "module-preload",
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;

      const preloadLinks: string[] = [];

      for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
        if (
          chunk.type === "chunk" &&
          (fileName.includes("vendor-react") ||
            fileName.includes("vendor-router"))
        ) {
          preloadLinks.push(`<link rel="modulepreload" href="/${fileName}" />`);
        }
      }

      return html.replace(
        "</head>",
        `${preloadLinks.join("\n    ")}\n  </head>`
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), modulePreloadPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 启用压缩
    minify: "esbuild",
    // CSS 代码分割
    cssCodeSplit: true,
    // 生成 source map 用于调试（生产环境可关闭）
    sourcemap: false,
    // 代码分割策略
    rollupOptions: {
      output: {
        // 手动分割 chunks
        manualChunks: {
          // React 核心库
          "vendor-react": ["react", "react-dom"],
          // 路由相关
          "vendor-router": ["react-router-dom"],
          // UI 相关
          "vendor-ui": [
            "@radix-ui/react-avatar",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "lucide-react",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
          // 表单和状态管理
          "vendor-state": [
            "zustand",
            "react-hook-form",
            "@hookform/resolvers",
            "zod",
          ],
          // 国际化
          "vendor-i18n": [
            "i18next",
            "react-i18next",
            "i18next-browser-languagedetector",
          ],
          // 其他工具
          "vendor-utils": ["axios", "sonner", "next-themes"],
        },
        // 资源文件名格式
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || "";
          if (info.endsWith(".css")) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(info)) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(info)) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    // 增加警告阈值
    chunkSizeWarningLimit: 500,
    // 目标浏览器
    target: "es2020",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1323",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

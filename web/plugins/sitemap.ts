/**
 * Vite 插件：构建时自动生成 sitemap.xml
 *
 * 配置说明：
 * - hostname: 网站域名（必填）
 * - routes: 路由配置数组
 * - defaultChangefreq: 默认更新频率
 * - defaultPriority: 默认优先级
 */

import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

export interface SitemapRoute {
  path: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastmod?: string;
}

export interface SitemapPluginOptions {
  hostname: string;
  routes: SitemapRoute[];
  defaultChangefreq?: SitemapRoute["changefreq"];
  defaultPriority?: number;
}

export function sitemapPlugin(options: SitemapPluginOptions): Plugin {
  const {
    hostname,
    routes,
    defaultChangefreq = "weekly",
    defaultPriority = 0.5,
  } = options;

  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    closeBundle() {
      const today = new Date().toISOString().split("T")[0];

      const urls = routes
        .map((route) => {
          const loc = `${hostname.replace(/\/$/, "")}${route.path}`;
          const lastmod = route.lastmod || today;
          const changefreq = route.changefreq || defaultChangefreq;
          const priority = route.priority ?? defaultPriority;

          return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
        })
        .join("\n");

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

      // 输出到 dist 目录
      const distPath = path.resolve(process.cwd(), "dist");
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }

      fs.writeFileSync(path.join(distPath, "sitemap.xml"), sitemap);
      console.log("✅ sitemap.xml generated successfully");
    },
  };
}

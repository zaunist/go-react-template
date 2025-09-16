// 博客数据管理
import type { TFunction } from "i18next";

// 博客文章类型定义
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    email?: string;
    website?: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
}

// 生成国际化博客内容的函数
const generateBlogContent = (t: TFunction) => {
  return `# ${t("blog.samplePost.content.heading")}

## ${t("blog.samplePost.content.intro.title")}

${t("blog.samplePost.content.intro.description")}

## ${t("blog.samplePost.content.techStack.title")}

### ${t("blog.samplePost.content.techStack.backend.title")}

- **Go ${t("common.language")?.toLowerCase() || "语言"}: ${t(
    "blog.samplePost.content.techStack.backend.go"
  )}
- **Echo ${t("common.framework")?.toLowerCase() || "框架"}: ${t(
    "blog.samplePost.content.techStack.backend.echo"
  )}
- **GORM**: ${t("blog.samplePost.content.techStack.backend.gorm")}
- **SQLite**: ${t("blog.samplePost.content.techStack.backend.sqlite")}
- **Session**: ${t("blog.samplePost.content.techStack.backend.session")}
- **bcrypt**: ${t("blog.samplePost.content.techStack.backend.bcrypt")}

### ${t("blog.samplePost.content.techStack.frontend.title")}

- **React 19+**: ${t("blog.samplePost.content.techStack.frontend.react")}
- **TypeScript**: ${t("blog.samplePost.content.techStack.frontend.typescript")}
- **TailwindCSS v4+**: ${t(
    "blog.samplePost.content.techStack.frontend.tailwind"
  )}
- **Zustand**: ${t("blog.samplePost.content.techStack.frontend.zustand")}
- **React Router DOM**: ${t(
    "blog.samplePost.content.techStack.frontend.router"
  )}
- **shadcn/ui**: ${t("blog.samplePost.content.techStack.frontend.shadcn")}
- **i18next**: ${t("blog.samplePost.content.techStack.frontend.i18next")}

## ${t("blog.samplePost.content.features.title")}

### 1. ${t("blog.samplePost.content.features.auth.title")}

- ${t("blog.samplePost.content.features.auth.register")}
- ${t("blog.samplePost.content.features.auth.session")}
- ${t("blog.samplePost.content.features.auth.password")}
- ${t("blog.samplePost.content.features.auth.auto")}

### 2. ${t("blog.samplePost.content.features.i18n.title")}

- ${t("blog.samplePost.content.features.i18n.switch")}
- ${t("blog.samplePost.content.features.i18n.dynamic")}
- ${t("blog.samplePost.content.features.i18n.responsive")}

### 3. ${t("blog.samplePost.content.features.ui.title")}

- ${t("blog.samplePost.content.features.ui.theme")}
- ${t("blog.samplePost.content.features.ui.glass")}
- ${t("blog.samplePost.content.features.ui.background")}
- ${t("blog.samplePost.content.features.ui.layout")}

### 4. ${t("blog.samplePost.content.features.dev.title")}

- ${t("blog.samplePost.content.features.dev.hotReload")}
- ${t("blog.samplePost.content.features.dev.typescript")}
- ${t("blog.samplePost.content.features.dev.eslint")}
- ${t("blog.samplePost.content.features.dev.build")}

## ${t("blog.samplePost.content.structure.title")}

${t("blog.samplePost.content.structure.description")}

- **${t("common.backend")?.toLowerCase() || "后端"}: ${t(
    "blog.samplePost.content.structure.backend"
  )}
- **${t("common.frontend")?.toLowerCase() || "前端"}: ${t(
    "blog.samplePost.content.structure.frontend"
  )}
- **${t("common.config")?.toLowerCase() || "配置"}: ${t(
    "blog.samplePost.content.structure.config"
  )}

## ${t("blog.samplePost.content.quickStart.title")}

1. ${t("blog.samplePost.content.quickStart.step1")}
2. ${t("blog.samplePost.content.quickStart.step2")}
3. ${t("blog.samplePost.content.quickStart.step3")}
4. ${t("blog.samplePost.content.quickStart.step4")}

${t("blog.samplePost.content.quickStart.description")}

## ${t("blog.samplePost.content.conclusion.title")}

${t("blog.samplePost.content.conclusion.description")}`;
};

// 获取国际化博客文章数据
export const getBlogPost = (t: TFunction): BlogPost => ({
  id: 1,
  title: t("blog.samplePost.title"),
  excerpt: t("blog.samplePost.excerpt"),
  content: generateBlogContent(t),
  author: {
    name: "Alan",
    avatar: "/api/placeholder/40/40",
    bio: t("blog.samplePost.author.bio"),
    email: "y.bz@foxmail.com",
    website: "https://ajie.lu",
  },
  publishDate: "2024-01-15",
  readTime: t("blog.samplePost.readTime"),
  category: t("blog.samplePost.category"),
  tags: ["Go", "React", "TypeScript", "Full Stack"],
  views: 1234,
});

// 获取博客文章列表
export const getBlogPosts = (t: TFunction): BlogPost[] => [
  getBlogPost(t),
  // 可以在这里添加更多博客文章
];

// 根据ID获取特定博客文章
export const getBlogPostById = (
  id: number,
  t: TFunction
): BlogPost | undefined => {
  const posts = getBlogPosts(t);
  return posts.find((post) => post.id === id);
};

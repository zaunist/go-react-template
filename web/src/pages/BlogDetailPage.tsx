// 博客详情页面
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, Tag, BookOpen, Hash, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBlogPost } from "@/blog/blogData";

// 从内容中提取目录
function extractTableOfContents(content: string) {
  const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
  return headings.map((heading, index) => {
    const level = heading.match(/^#+/)?.[0].length || 1;
    const text = heading.replace(/^#+\s+/, "");
    return { id: `heading-${index}`, text, level };
  });
}

// 渲染 Markdown 内容（简化版）
function renderMarkdown(content: string) {
  return content
    .split("\n")
    .map((line, index) => {
      // 标题
      if (line.match(/^#{1,6}\s+/)) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s+/, "");
        const className =
          {
            1: "text-3xl font-bold text-gray-800 mt-8 mb-4 first:mt-0",
            2: "text-2xl font-bold text-gray-800 mt-6 mb-3",
            3: "text-xl font-semibold text-gray-700 mt-5 mb-2",
            4: "text-lg font-semibold text-gray-700 mt-4 mb-2",
            5: "text-base font-semibold text-gray-700 mt-3 mb-2",
            6: "text-sm font-semibold text-gray-700 mt-3 mb-2",
          }[level] || "text-base font-semibold text-gray-700 mt-3 mb-2";

        // 使用 React.createElement 来动态创建标题元素
        return React.createElement(
          `h${level}`,
          {
            key: index,
            id: `heading-${index}`,
            className: className,
          },
          text
        );
      }

      // 列表项
      if (line.match(/^-\s+/)) {
        const text = line.replace(/^-\s+/, "");
        // 检查是否是粗体
        if (text.match(/\*\*(.+?)\*\*/)) {
          const parts = text.split(/\*\*(.+?)\*\*/);
          return (
            <li key={index} className="text-gray-600 mb-1">
              {parts.map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="font-semibold text-gray-800">
                    {part}
                  </strong>
                ) : (
                  part
                )
              )}
            </li>
          );
        }
        return (
          <li key={index} className="text-gray-600 mb-1">
            {text}
          </li>
        );
      }

      // 空行
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // 普通段落
      if (!line.match(/^#{1,6}\s+/) && line.trim() !== "") {
        return (
          <p key={index} className="text-gray-600 leading-relaxed mb-4">
            {line}
          </p>
        );
      }

      return null;
    })
    .filter(Boolean);
}

export default function BlogDetailPage() {
  const { t } = useTranslation();
  const [activeHeading, setActiveHeading] = useState("");
  
  // 获取国际化的博客数据
  const blogPost = getBlogPost(t);
  const tableOfContents = extractTableOfContents(blogPost.content);

  // 监听滚动，高亮当前章节
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      let current = "";

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });

      setActiveHeading(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 text-gray-800 font-sans overflow-hidden relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 动态流光效果 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/30 via-amber-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-yellow-200/25 via-orange-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/20 via-orange-50/30 to-yellow-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* 微噪点效果 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23f59e0b%27 fill-opacity=%271%27%3E%3Ccircle cx=%277%27 cy=%277%27 r=%270.5%27%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')",
          }}
        ></div>

        {/* 极细描边网格 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 文章内容 */}
          <div className="lg:col-span-3">
            <article className="bg-white/70 backdrop-blur-xl border border-orange-200/50 rounded-xl p-8 shadow-xl shadow-orange-100/20">
              {/* 文章头部 */}
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {blogPost.title}
                </h1>

                {/* 文章元信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blogPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPost.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{blogPost.views} {t("blog.views")}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100/80 text-orange-700 border-orange-200"
                  >
                    {blogPost.category}
                  </Badge>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-amber-50/80 text-amber-700 border-amber-200 hover:bg-amber-100/80 transition-colors"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator className="mt-6 bg-orange-200/50" />
              </header>

              {/* 文章内容 */}
              <div className="prose prose-lg max-w-none">
                {renderMarkdown(blogPost.content)}
              </div>
            </article>
          </div>

          {/* 右侧侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 作者信息 */}
            <Card className="bg-white/70 backdrop-blur-xl border border-orange-200/50 shadow-lg shadow-orange-100/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  {t("blog.author")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 border-2 border-orange-200">
                    <AvatarImage
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                    />
                    <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">
                      {blogPost.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {blogPost.author.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {blogPost.author.bio}
                    </p>
                    {blogPost.author.website && (
                      <a
                        href={blogPost.author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        {t("blog.visitHomepage")} →
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 文章目录 */}
            <Card className="bg-white/70 backdrop-blur-xl border border-orange-200/50 shadow-lg shadow-orange-100/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  {t("blog.tableOfContents")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left text-sm transition-colors duration-200 py-1 px-2 rounded ${
                        activeHeading === item.id
                          ? "bg-orange-100/80 text-orange-700 font-medium"
                          : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/50"
                      }`}
                      style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* 分类信息 */}
            <Card className="bg-white/70 backdrop-blur-xl border border-orange-200/50 shadow-lg shadow-orange-100/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-orange-600" />
                  {t("blog.category")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-orange-100/80 text-orange-700 border-orange-200 text-sm px-3 py-1">
                  {blogPost.category}
                </Badge>
              </CardContent>
            </Card>

            {/* 标签云 */}
            <Card className="bg-white/70 backdrop-blur-xl border border-orange-200/50 shadow-lg shadow-orange-100/20">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-orange-600" />
                  {t("blog.tags")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-amber-50/80 text-amber-700 border-amber-200 hover:bg-amber-100/80 transition-colors cursor-pointer text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

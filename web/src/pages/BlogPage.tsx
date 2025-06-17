// 博客列表页面
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Tag, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getBlogPosts } from "@/blog/blogData";

export default function BlogPage() {
  const { t } = useTranslation();
  
  // 获取国际化的博客数据
  const blogPosts = getBlogPosts(t);

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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
            {t("blog.title")}
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        {/* 博客文章列表 */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-orange-200/50 hover:border-orange-300/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-100/50"
            >
              {/* 卡片光效 */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 to-amber-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-700 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </CardDescription>
                  </div>
                </div>

                {/* 文章元信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100/80 text-orange-700 border-orange-200"
                  >
                    {post.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
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

                {/* 阅读更多按钮 */}
                <Link to={`/blog/${post.id}`}>
                  <div className="group/btn flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors cursor-pointer">
                    <span>{t("blog.readMore")}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </CardContent>

              {/* 极细描边效果 */}
              <div className="absolute inset-0 rounded-lg border border-orange-200/30 group-hover:border-orange-300/50 transition-colors duration-500"></div>
            </Card>
          ))}
        </div>

        {/* 底部信息 */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm font-medium">
            {t("blog.updateStatus")}
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-sm shadow-orange-200"></div>
            <span className="text-gray-400 text-xs font-medium">
              {t("blog.systemStatus")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

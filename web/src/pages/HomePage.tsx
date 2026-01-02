import { Link } from "react-router-dom";
import {
  ArrowRight,
  ImageOff,
  FileImage,
  Sparkles,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { memo } from "react";
import SEO from "@/components/SEO";

// 首页 SEO 结构化数据
const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MDZZ Toolbox",
  url: "https://toolbox.mdzz.studio",
  description:
    "Free online tools for image processing. Watermark remover, image converter, and more.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://toolbox.mdzz.studio/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// 像素风格工具卡片组件
const ToolCard = memo(function ToolCard({
  icon: Icon,
  title,
  description,
  path,
  isNew,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  isNew?: boolean;
  color: string;
}) {
  return (
    <Link to={path} className="pixel-card p-6 block">
      <div className="flex items-start gap-4">
        <div className={`pixel-icon-box-md ${color}`}>
          <Icon className="w-7 h-7 text-pixel-black" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="pixel-title text-lg text-pixel-black">{title}</h3>
            {isNew && <span className="pixel-tag-new">New!</span>}
          </div>
          <p className="text-sm text-gray-600 font-medium leading-relaxed">
            {description}
          </p>
        </div>
        <div className="pixel-icon-box-sm bg-pixel-yellow shrink-0 group-hover:bg-pixel-coral transition-colors">
          <ArrowRight className="w-5 h-5 text-pixel-black" strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
});

// 像素风格特性卡片
const FeatureItem = memo(function FeatureItem({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="text-center group">
      <div
        className={`pixel-icon-box-lg ${color} mx-auto mb-4 group-hover:translate-y-[-4px] transition-transform`}
      >
        <Icon className="w-8 h-8 text-pixel-black" strokeWidth={2.5} />
      </div>
      <h3 className="pixel-title text-base text-pixel-black mb-2">{title}</h3>
      <p className="text-sm text-gray-600 font-medium">{description}</p>
    </div>
  );
});

// 静态数据
const tools = [
  {
    icon: ImageOff,
    title: "Watermark Remover",
    description:
      "Remove watermarks, logos, text, and unwanted objects from images with AI technology.",
    path: "/tools/watermark-remover",
    isNew: true,
    color: "bg-pixel-mint",
  },
  {
    icon: FileImage,
    title: "Image Converter",
    description:
      "Convert images between JPG, PNG, WebP, GIF, BMP, and more formats instantly.",
    path: "/tools/image-converter",
    isNew: true,
    color: "bg-pixel-sky",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "100% Free",
    description: "All tools are completely free to use with no hidden costs.",
    color: "bg-pixel-yellow",
  },
  {
    icon: Shield,
    title: "100% Local",
    description:
      "All processing is done locally in your browser for maximum privacy.",
    color: "bg-pixel-mint",
  },
  {
    icon: Zap,
    title: "No Registration",
    description: "Use our tools instantly without creating an account.",
    color: "bg-pixel-coral",
  },
  {
    icon: Clock,
    title: "Fast & Secure",
    description: "Quick processing with your privacy always protected.",
    color: "bg-pixel-lavender",
  },
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="MDZZ Toolbox - Free Online Image Tools"
        description="Free online tools for image processing. Remove watermarks, convert image formats, and more. 100% free, no registration required, all processing done locally in your browser."
        keywords="free image tools, watermark remover, image converter, online tools, no registration, privacy, browser-based"
        canonicalUrl="/"
        structuredData={homeStructuredData}
      />
      <div className="min-h-screen pixel-bg-cream pixel-bg-grid pt-[70px]">
        {/* Hero Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          {/* Floating pixel decorations */}
          <div className="absolute top-12 left-8 w-4 h-4 bg-pixel-yellow border-2 border-pixel-black pixel-float" />
          <div className="absolute top-24 right-16 w-3 h-3 bg-pixel-coral border-2 border-pixel-black pixel-bounce" />
          <div className="absolute bottom-16 left-1/4 w-3 h-3 bg-pixel-mint border-2 border-pixel-black" />
          <div
            className="absolute top-32 left-1/3 w-2 h-2 bg-pixel-lavender border-2 border-pixel-black pixel-float"
            style={{ animationDelay: "1s" }}
          />

          <div className="max-w-[1200px] mx-auto px-4 text-center relative">
            {/* Main Title */}
            <div className="relative inline-block mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="pixel-star text-pixel-yellow">✦</span>
                <span className="pixel-tag-yellow">Free Online</span>
                <span className="pixel-star text-pixel-coral">✦</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-pixel-black uppercase tracking-tight leading-none">
                Toolbox
              </h1>
              {/* Underline decoration */}
              <div className="mt-3 mx-auto w-48 h-2 bg-pixel-coral border-2 border-pixel-black" />
            </div>

            {/* Speech bubble description */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="pixel-bubble">
                <p className="text-lg md:text-xl font-bold text-pixel-black">
                  A collection of <span className="text-pixel-coral">free</span>
                  , easy-to-use online tools for image processing.{" "}
                  <span className="text-pixel-teal">
                    No registration required!
                  </span>
                </p>
              </div>
            </div>

            {/* Feature tags */}
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="pixel-tag-yellow">★ FREE</span>
              <span className="pixel-tag-mint">★ FAST</span>
              <span className="pixel-tag-lavender">★ SECURE</span>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-16 relative">
          <div className="max-w-[1200px] mx-auto px-4">
            {/* Section Title */}
            <div className="text-center mb-12">
              <div className="inline-block pixel-border bg-pixel-coral px-6 py-3 -rotate-1 mb-4">
                <h2 className="pixel-title text-2xl md:text-3xl text-white">
                  Our Free Tools
                </h2>
              </div>
              <p className="text-gray-600 font-medium max-w-xl mx-auto mt-6">
                Choose from our collection of powerful tools designed to help
                you with your multimedia needs.
              </p>
            </div>

            {/* Tool Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 relative">
          {/* Top stripe decoration */}
          <div className="pixel-divider-decorated absolute top-0 left-0 right-0" />

          <div className="max-w-[1200px] mx-auto px-4 pt-8">
            <div className="text-center mb-12">
              <div className="inline-block pixel-border bg-pixel-teal px-6 py-3 rotate-1">
                <h2 className="pixel-title text-2xl md:text-3xl text-pixel-black">
                  Why Choose Us?
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </div>

          {/* Bottom stripe decoration */}
          <div className="pixel-divider-decorated absolute bottom-0 left-0 right-0" />
        </section>

        {/* How It Works Section */}
        <section className="py-20 relative">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block pixel-border bg-pixel-lavender px-6 py-3 -rotate-1">
                <h2 className="pixel-title text-2xl md:text-3xl text-pixel-black">
                  How It Works
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "Choose a Tool",
                  desc: "Select the tool you need from our collection of free online utilities.",
                  color: "bg-pixel-coral",
                },
                {
                  num: "02",
                  title: "Upload File",
                  desc: "Upload your image or video file to start processing immediately.",
                  color: "bg-pixel-yellow",
                },
                {
                  num: "03",
                  title: "Download",
                  desc: "Download your processed file instantly. It's that simple!",
                  color: "bg-pixel-mint",
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 -right-4 w-8">
                      <div className="pixel-divider-dashed h-1" />
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 
                      border-t-[6px] border-t-transparent 
                      border-b-[6px] border-b-transparent 
                      border-l-[8px] border-l-pixel-black"
                      />
                    </div>
                  )}

                  <div className="pixel-card p-6 text-center relative pt-10">
                    {/* Number badge */}
                    <div
                      className={`pixel-number ${step.color} absolute -top-5 left-1/2 -translate-x-1/2`}
                    >
                      {step.num}
                    </div>

                    <h3 className="pixel-title text-lg text-pixel-black mb-3 mt-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

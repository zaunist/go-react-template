import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageOff, ArrowRight } from "lucide-react";

// 工具卡片组件
const ToolCard = ({
  icon: Icon,
  title,
  description,
  path,
  isNew,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  path: string;
  isNew?: boolean;
}) => (
  <Link
    to={path}
    className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-[#7b4aff]/30 hover:shadow-lg transition-all"
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-lg bg-[#f5f3ff] flex items-center justify-center group-hover:bg-[#7b4aff] transition-colors">
        <Icon className="w-6 h-6 text-[#7b4aff] group-hover:text-white transition-colors" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-semibold text-[#1e1e1e] group-hover:text-[#7b4aff] transition-colors">
            {title}
          </h3>
          {isNew && (
            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-600 rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-sm text-[#666] leading-relaxed">{description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#7b4aff] group-hover:translate-x-1 transition-all" />
    </div>
  </Link>
);

// 特性项组件
const FeatureItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="text-center">
    <h3 className="text-xl font-semibold text-[#1e1e1e] mb-2">{title}</h3>
    <p className="text-sm text-[#666]">{description}</p>
  </div>
);

export default function HomePage() {
  const tools = [
    {
      icon: ImageOff,
      title: "Watermark Remover",
      description:
        "Remove watermarks, logos, text, and unwanted objects from images with AI technology.",
      path: "/tools/watermark-remover",
      isNew: true,
    },
  ];

  const features = [
    {
      title: "100% Free",
      description: "All tools are completely free to use with no hidden costs.",
    },
    {
      title: "100% Local",
      description:
        "All processing is done locally in your browser for maximum privacy.",
    },
    {
      title: "No Registration",
      description: "Use our tools instantly without creating an account.",
    },
    {
      title: "Fast & Secure",
      description: "Quick processing with your privacy always protected.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-[66px]">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center bg-gradient-to-b from-[#fafafa] to-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e1e1e]">
            Free Online Toolbox
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-[#454545]">
            A collection of free, easy-to-use online tools for image and video
            processing. No registration required, no software to install.
          </p>
          <Button variant="primary" size="xl" asChild>
            <Link to="/tools/watermark-remover">
              <ImageOff className="w-6 h-6" />
              Try Watermark Remover
            </Link>
          </Button>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e1e1e]">
            Our Free Tools
          </h2>
          <p className="text-center text-[#666] mb-12 max-w-2xl mx-auto">
            Choose from our collection of powerful tools designed to help you
            with your multimedia needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
            Why Choose MDZZ Toolbox
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f5f3ff] flex items-center justify-center">
                <span className="text-2xl font-bold text-[#7b4aff]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e1e1e]">
                Choose a Tool
              </h3>
              <p className="text-sm text-[#666]">
                Select the tool you need from our collection of free online
                utilities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f5f3ff] flex items-center justify-center">
                <span className="text-2xl font-bold text-[#7b4aff]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e1e1e]">
                Upload Your File
              </h3>
              <p className="text-sm text-[#666]">
                Upload your image or video file to start processing immediately.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f5f3ff] flex items-center justify-center">
                <span className="text-2xl font-bold text-[#7b4aff]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e1e1e]">
                Download Result
              </h3>
              <p className="text-sm text-[#666]">
                Download your processed file instantly. It is that simple!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1e1e1e]">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Try our most popular tool - the AI-powered Watermark Remover.
          </p>
          <Button
            variant="primary"
            size="xl"
            className="bg-white text-[#1e1e1e] hover:bg-gray-100"
            asChild
          >
            <Link to="/tools/watermark-remover">
              <ImageOff className="w-6 h-6" />
              Remove Watermark Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

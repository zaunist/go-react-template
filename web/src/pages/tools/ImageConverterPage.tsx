import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Upload,
  Shield,
  Zap,
  Star,
  Lock,
  Layers,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

// Image Converter SEO 结构化数据
const imageConverterStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Format Converter",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online image format converter. Convert images between JPG, PNG, WebP, GIF, BMP, and AVIF formats instantly.",
};

// 像素风格步骤图标
const PixelStepIcon = ({
  number,
  color,
}: {
  number: number;
  color: string;
}) => (
  <div
    className="w-20 h-20 flex items-center justify-center pixel-border-sm text-3xl font-black"
    style={{ backgroundColor: color }}
  >
    {number}
  </div>
);

// 像素风格特性图标
const PixelFeatureIcon = ({ type }: { type: string }) => {
  const iconMap: Record<string, { icon: React.ReactNode; bg: string }> = {
    free: {
      icon: <Star className="w-8 h-8" />,
      bg: "var(--color-pixel-yellow)",
    },
    formats: {
      icon: <Layers className="w-8 h-8" />,
      bg: "var(--color-pixel-sky)",
    },
    fast: {
      icon: <Zap className="w-8 h-8" />,
      bg: "var(--color-pixel-coral)",
    },
    quality: {
      icon: <Settings className="w-8 h-8" />,
      bg: "var(--color-pixel-lavender)",
    },
    secure: {
      icon: <Lock className="w-8 h-8" />,
      bg: "var(--color-pixel-teal)",
    },
    batch: {
      icon: <Layers className="w-8 h-8" />,
      bg: "var(--color-pixel-mint)",
    },
  };
  const item = iconMap[type] || iconMap.free;
  return (
    <div
      className="w-16 h-16 flex items-center justify-center pixel-border-sm"
      style={{ backgroundColor: item.bg }}
    >
      {item.icon}
    </div>
  );
};

// 像素风格格式徽章
const PixelFormatBadge = ({
  format,
  color,
}: {
  format: string;
  color: string;
}) => (
  <span
    className="pixel-border-sm px-3 py-1.5 text-sm font-bold"
    style={{ backgroundColor: color }}
  >
    {format}
  </span>
);

// FAQ 组件 - 像素风格
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b-3 border-[var(--color-pixel-black)] last:border-b-0">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 text-left font-bold hover:text-[var(--color-pixel-sky)] transition-colors"
    >
      <span className="uppercase text-sm">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-6 h-6 text-[var(--color-pixel-sky)]" />
      ) : (
        <ChevronDown className="w-6 h-6" />
      )}
    </button>
    {isOpen && (
      <div
        className="pb-4 text-sm leading-relaxed"
        style={{ color: "#454545" }}
      >
        {answer}
      </div>
    )}
  </div>
);

export default function ImageConverterPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/tools/image-converter/editor");
  };

  const steps = [
    {
      number: 1,
      color: "var(--color-pixel-sky)",
      title: "UPLOAD IMAGE",
      description:
        "Click 'Upload Image' button to import your image file in any format.",
    },
    {
      number: 2,
      color: "var(--color-pixel-yellow)",
      title: "SELECT FORMAT",
      description:
        "Choose your desired output format from our supported formats list.",
    },
    {
      number: 3,
      color: "var(--color-pixel-mint)",
      title: "DOWNLOAD",
      description: "Click download to save your converted image instantly.",
    },
  ];

  const features = [
    {
      type: "free",
      title: "COMPLETELY FREE",
      description:
        "Convert images between any formats 100% free, no limits, no watermarks.",
    },
    {
      type: "formats",
      title: "ALL FORMATS",
      description:
        "Support JPG, PNG, WebP, GIF, BMP, TIFF, ICO, AVIF, and more formats.",
    },
    {
      type: "fast",
      title: "INSTANT CONVERT",
      description:
        "Convert images in seconds with our optimized processing engine.",
    },
    {
      type: "quality",
      title: "HIGH QUALITY",
      description:
        "Maintain image quality during conversion with adjustable settings.",
    },
    {
      type: "secure",
      title: "100% LOCAL",
      description:
        "All processing happens in your browser. Your images never leave your device.",
    },
    {
      type: "batch",
      title: "BATCH CONVERT",
      description: "Convert multiple images at once to save time and effort.",
    },
  ];

  const supportedFormats = [
    { format: "JPG", color: "var(--color-pixel-coral)" },
    { format: "PNG", color: "var(--color-pixel-sky)" },
    { format: "WebP", color: "var(--color-pixel-mint)" },
    { format: "GIF", color: "var(--color-pixel-yellow)" },
    { format: "BMP", color: "var(--color-pixel-lavender)" },
    { format: "AVIF", color: "var(--color-pixel-teal)" },
    { format: "ICO", color: "var(--color-pixel-pink)" },
    { format: "TIFF", color: "var(--color-pixel-orange)" },
  ];

  const faqs = [
    {
      question: "What image formats are supported?",
      answer:
        "Our Image Converter supports all major image formats including JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, ICO, and AVIF. You can convert between any of these formats freely.",
    },
    {
      question: "Is the image conversion free?",
      answer:
        "Yes, our Image Format Converter is completely free to use. There are no hidden costs, no subscriptions, and no watermarks added to your converted images.",
    },
    {
      question: "Will I lose image quality during conversion?",
      answer:
        "Our converter is designed to maintain the highest possible quality during conversion. For formats like JPG that use lossy compression, you can adjust the quality settings to balance file size and image quality.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely! All image processing is done locally in your browser using JavaScript. Your images never leave your device and are not uploaded to any server. Your privacy is completely protected.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer:
        "Yes, our converter supports batch conversion. You can upload multiple images and convert them all to your desired format at once, saving you time and effort.",
    },
  ];

  return (
    <>
      <SEO
        title="Free Image Format Converter - Convert JPG, PNG, WebP, GIF Online"
        description="Convert images between JPG, PNG, WebP, GIF, BMP, AVIF and more formats instantly. 100% free, batch conversion, no registration required, all processing done locally."
        keywords="image converter, format converter, convert jpg to png, convert png to webp, image format converter, free image converter, online image converter, batch image converter"
        canonicalUrl="/tools/image-converter"
        structuredData={imageConverterStructuredData}
      />
      <div
        className="min-h-screen pt-[66px]"
        style={{ backgroundColor: "var(--color-pixel-cream)" }}
      >
        {/* Hero Section - Pixel Style */}
        <section className="py-16 relative overflow-hidden">
          {/* 像素装饰背景 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-8 h-8 bg-[var(--color-pixel-sky)]" />
            <div className="absolute top-20 right-20 w-6 h-6 bg-[var(--color-pixel-yellow)]" />
            <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-[var(--color-pixel-mint)]" />
            <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[var(--color-pixel-lavender)]" />
          </div>

          <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
            <div
              className="inline-block pixel-border-sm px-4 py-2 mb-6"
              style={{ backgroundColor: "var(--color-pixel-sky)" }}
            >
              <span className="font-bold text-sm uppercase">🔄 Free Tool</span>
            </div>

            <h1
              className="pixel-title text-4xl md:text-6xl mb-6"
              style={{ color: "var(--color-pixel-black)" }}
            >
              IMAGE FORMAT
              <br />
              <span style={{ color: "var(--color-pixel-sky)" }}>CONVERTER</span>
            </h1>

            <p
              className="text-lg mb-6 max-w-2xl mx-auto font-medium"
              style={{ color: "#454545" }}
            >
              Convert images between JPG, PNG, WebP, GIF, BMP, and more formats
              instantly. 100% free, no registration required!
            </p>

            {/* 支持的格式展示 - 像素风格 */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {supportedFormats.map((item) => (
                <PixelFormatBadge
                  key={item.format}
                  format={item.format}
                  color={item.color}
                />
              ))}
            </div>

            <button
              onClick={handleUploadClick}
              className="pixel-btn-primary text-lg px-10 py-4"
              style={{ backgroundColor: "var(--color-pixel-sky)" }}
            >
              <Upload className="w-6 h-6" />
              UPLOAD IMAGE
            </button>

            <p className="mt-6 text-sm font-medium" style={{ color: "#666" }}>
              📁 Support JPG, PNG, WebP, GIF, BMP, TIFF, ICO, AVIF formats
            </p>
          </div>
        </section>

        {/* How To Section - Pixel Style */}
        <section className="py-16" style={{ backgroundColor: "white" }}>
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <div
                className="inline-block pixel-border-sm px-4 py-2 mb-4"
                style={{ backgroundColor: "var(--color-pixel-mint)" }}
              >
                <span className="font-bold text-sm uppercase">📖 Tutorial</span>
              </div>
              <h2
                className="pixel-title text-3xl md:text-4xl"
                style={{ color: "var(--color-pixel-black)" }}
              >
                HOW TO CONVERT IMAGES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="pixel-card p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <PixelStepIcon number={step.number} color={step.color} />
                  </div>
                  <h3
                    className="font-black text-lg mb-2 uppercase"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#454545" }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Section 1 - Format Support */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--color-pixel-cream)" }}
        >
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-block pixel-border-sm px-3 py-1 mb-4"
                  style={{ backgroundColor: "var(--color-pixel-sky)" }}
                >
                  <span className="font-bold text-xs uppercase">
                    📁 Formats
                  </span>
                </div>
                <h2
                  className="pixel-title text-2xl md:text-3xl mb-4"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  ALL FORMATS SUPPORTED
                </h2>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "#454545" }}
                >
                  Our free online Image Converter supports a wide range of image
                  formats. Whether you need to convert JPG to PNG for
                  transparency, PNG to WebP for smaller file sizes, or any other
                  format combination, we've got you covered.
                </p>
                <ul className="space-y-2" style={{ color: "#454545" }}>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-pixel-coral)]">✓</span>
                    <span className="font-bold">JPG/JPEG</span> - Best for
                    photographs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-pixel-sky)]">✓</span>
                    <span className="font-bold">PNG</span> - Supports
                    transparency
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-pixel-mint)]">✓</span>
                    <span className="font-bold">WebP</span> - Modern format with
                    great compression
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-pixel-yellow)]">✓</span>
                    <span className="font-bold">GIF</span> - For simple
                    animations
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div
                  className="pixel-card p-8"
                  style={{ backgroundColor: "var(--color-pixel-sky)" }}
                >
                  <div className="text-center">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {["JPG", "PNG", "WebP", "GIF"].map((format) => (
                        <div
                          key={format}
                          className="pixel-border-sm w-16 h-16 flex items-center justify-center font-bold"
                          style={{ backgroundColor: "white" }}
                        >
                          {format}
                        </div>
                      ))}
                    </div>
                    <div className="text-3xl mb-2">⇅</div>
                    <p className="font-black uppercase">Any ↔ Any</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section 2 - Privacy */}
        <section className="py-16" style={{ backgroundColor: "white" }}>
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 flex justify-center">
                <div
                  className="pixel-card p-8"
                  style={{ backgroundColor: "var(--color-pixel-mint)" }}
                >
                  <div className="text-center">
                    <div
                      className="w-24 h-24 mx-auto mb-4 pixel-border flex items-center justify-center"
                      style={{ backgroundColor: "white" }}
                    >
                      <Shield
                        className="w-12 h-12"
                        style={{ color: "var(--color-pixel-teal)" }}
                      />
                    </div>
                    <p className="font-black uppercase">100% Local & Private</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div
                  className="inline-block pixel-border-sm px-3 py-1 mb-4"
                  style={{ backgroundColor: "var(--color-pixel-teal)" }}
                >
                  <span className="font-bold text-xs uppercase">
                    🔒 Privacy
                  </span>
                </div>
                <h2
                  className="pixel-title text-2xl md:text-3xl mb-4"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  100% LOCAL PROCESSING
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#454545" }}
                >
                  Unlike other online converters that upload your images to
                  remote servers, our Image Converter processes everything
                  directly in your browser using modern JavaScript APIs. Your
                  images never leave your device, ensuring complete privacy and
                  data security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section 3 - Quality */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--color-pixel-cream)" }}
        >
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-block pixel-border-sm px-3 py-1 mb-4"
                  style={{ backgroundColor: "var(--color-pixel-lavender)" }}
                >
                  <span className="font-bold text-xs uppercase">
                    ⚙️ Quality
                  </span>
                </div>
                <h2
                  className="pixel-title text-2xl md:text-3xl mb-4"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  ADJUSTABLE QUALITY
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#454545" }}
                >
                  Our Image Converter gives you full control over the output
                  quality. For formats like JPG and WebP that use compression,
                  you can adjust the quality slider to find the perfect balance
                  between file size and image quality.
                </p>
              </div>
              <div className="flex justify-center">
                <div
                  className="pixel-card p-6"
                  style={{ backgroundColor: "var(--color-pixel-lavender)" }}
                >
                  <div className="text-center p-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-4xl">📷</div>
                      <div className="text-2xl">→</div>
                      <div className="text-4xl">✨</div>
                    </div>
                    <div
                      className="pixel-border-sm p-4"
                      style={{ backgroundColor: "white" }}
                    >
                      <div className="text-sm font-bold mb-2">QUALITY</div>
                      <div className="h-3 bg-gray-200 pixel-border-sm">
                        <div
                          className="h-3 w-4/5"
                          style={{
                            backgroundColor: "var(--color-pixel-lavender)",
                          }}
                        ></div>
                      </div>
                      <div
                        className="text-right text-sm font-bold mt-1"
                        style={{ color: "var(--color-pixel-lavender)" }}
                      >
                        80%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16" style={{ backgroundColor: "white" }}>
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-12">
              <div
                className="inline-block pixel-border-sm px-4 py-2 mb-4"
                style={{ backgroundColor: "var(--color-pixel-sky)" }}
              >
                <span className="font-bold text-sm uppercase">⭐ Features</span>
              </div>
              <h2
                className="pixel-title text-3xl md:text-4xl"
                style={{ color: "var(--color-pixel-black)" }}
              >
                WHY CHOOSE US
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="pixel-card p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <PixelFeatureIcon type={feature.type} />
                  </div>
                  <h3
                    className="font-black text-sm mb-2"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#454545" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Pixel Style */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--color-pixel-sky)" }}
        >
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="pixel-title text-3xl md:text-4xl text-white mb-4">
              READY TO CONVERT?
            </h2>
            <p className="text-white/90 mb-8 font-medium">
              Start converting images between any formats now. It's free, fast,
              and secure.
            </p>
            <button
              onClick={handleUploadClick}
              className="pixel-btn-secondary text-lg px-10 py-4"
            >
              START CONVERTING - IT'S FREE
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--color-pixel-cream)" }}
        >
          <div className="max-w-[800px] mx-auto px-4">
            <div className="text-center mb-12">
              <div
                className="inline-block pixel-border-sm px-4 py-2 mb-4"
                style={{ backgroundColor: "var(--color-pixel-yellow)" }}
              >
                <span className="font-bold text-sm uppercase">❓ FAQ</span>
              </div>
              <h2
                className="pixel-title text-3xl md:text-4xl"
                style={{ color: "var(--color-pixel-black)" }}
              >
                QUESTIONS & ANSWERS
              </h2>
            </div>

            <div
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

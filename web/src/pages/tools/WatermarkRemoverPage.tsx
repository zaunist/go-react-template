import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Upload,
  Shield,
  Zap,
  Star,
  Lock,
  Ban,
  Wand2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

// Watermark Remover SEO 结构化数据
const watermarkRemoverStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Watermark Remover",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Free online watermark remover tool. Remove watermarks, logos, text, and unwanted objects from images with AI technology.",
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
    easy: {
      icon: <Wand2 className="w-8 h-8" />,
      bg: "var(--color-pixel-mint)",
    },
    fast: {
      icon: <Zap className="w-8 h-8" />,
      bg: "var(--color-pixel-coral)",
    },
    quality: {
      icon: <Star className="w-8 h-8" />,
      bg: "var(--color-pixel-lavender)",
    },
    secure: {
      icon: <Lock className="w-8 h-8" />,
      bg: "var(--color-pixel-teal)",
    },
    noads: {
      icon: <Ban className="w-8 h-8" />,
      bg: "var(--color-pixel-pink)",
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
      className="w-full flex items-center justify-between py-4 text-left font-bold hover:text-[var(--color-pixel-coral)] transition-colors"
    >
      <span className="uppercase text-sm">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-6 h-6 text-[var(--color-pixel-coral)]" />
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

export default function WatermarkRemoverPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/tools/watermark-remover/editor");
  };

  const steps = [
    {
      number: 1,
      color: "var(--color-pixel-coral)",
      title: "ADD IMAGE",
      description: "Click 'Upload Image' button to import your image file.",
    },
    {
      number: 2,
      color: "var(--color-pixel-yellow)",
      title: "SELECT AREA",
      description: "Select the watermark area and click 'Remove' button.",
    },
    {
      number: 3,
      color: "var(--color-pixel-mint)",
      title: "DOWNLOAD",
      description: "Click 'Download' to save the watermark-free image.",
    },
  ];

  const features = [
    {
      type: "free",
      title: "COMPLETELY FREE",
      description:
        "You can use this tool to remove watermarks from photos 100% free.",
    },
    {
      type: "easy",
      title: "EASY TO USE",
      description:
        "Clear guides and design make it easier to remove watermarks from images.",
    },
    {
      type: "fast",
      title: "FAST REMOVAL",
      description: "The image watermark removal process is very fast.",
    },
    {
      type: "quality",
      title: "HIGH QUALITY",
      description:
        "You can save images in high quality after removing watermarks.",
    },
    {
      type: "secure",
      title: "100% SECURE",
      description:
        "All processing is done locally, your images never leave your device.",
    },
    {
      type: "noads",
      title: "NO ADS",
      description:
        "Unlike other websites, this watermark remover has no advertisements.",
    },
  ];

  const faqs = [
    {
      question: "What is a watermark in a photo?",
      answer:
        "A watermark is an image that identifies a picture and tells people who the picture belongs to. It can also be a logo or text. Watermarks on photos are usually transparent.",
    },
    {
      question: "Can watermarks be removed for free?",
      answer:
        "Yes, our Free Online Watermark Remover allows you to remove watermarks from images completely free of charge. No subscription or payment required.",
    },
    {
      question: "How to remove watermarks from images on iPhone?",
      answer:
        "You can visit our Free Online Watermark Remover on your iPhone's browser, upload your image, select the watermark area, and remove it directly on your mobile device.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely! All image processing is done locally in your browser. Your images never leave your device and are not uploaded to any server.",
    },
  ];

  return (
    <>
      <SEO
        title="Free Online Watermark Remover - Remove Watermarks from Images"
        description="Remove watermarks, logos, text, and unwanted objects from your images instantly. 100% free, no registration required, all processing done locally in your browser."
        keywords="watermark remover, remove watermark, delete watermark, free watermark remover, online watermark remover, image watermark removal, photo watermark remover"
        canonicalUrl="/tools/watermark-remover"
        structuredData={watermarkRemoverStructuredData}
      />
      <div
        className="min-h-screen pt-[66px]"
        style={{ backgroundColor: "var(--color-pixel-cream)" }}
      >
        {/* Hero Section - Pixel Style */}
        <section className="py-16 relative overflow-hidden">
          {/* 像素装饰背景 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-8 h-8 bg-[var(--color-pixel-coral)]" />
            <div className="absolute top-20 right-20 w-6 h-6 bg-[var(--color-pixel-yellow)]" />
            <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-[var(--color-pixel-mint)]" />
            <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[var(--color-pixel-lavender)]" />
          </div>

          <div className="max-w-[1200px] mx-auto px-4 text-center relative z-10">
            <div
              className="inline-block pixel-border-sm px-4 py-2 mb-6"
              style={{ backgroundColor: "var(--color-pixel-yellow)" }}
            >
              <span className="font-bold text-sm uppercase">✨ Free Tool</span>
            </div>

            <h1
              className="pixel-title text-4xl md:text-6xl mb-6"
              style={{ color: "var(--color-pixel-black)" }}
            >
              WATERMARK
              <br />
              <span style={{ color: "var(--color-pixel-coral)" }}>REMOVER</span>
            </h1>

            <p
              className="text-lg mb-8 max-w-2xl mx-auto font-medium"
              style={{ color: "#454545" }}
            >
              Remove watermarks, logos, text, and unwanted objects from your
              images instantly. 100% free, no registration required!
            </p>

            <button
              onClick={handleUploadClick}
              className="pixel-btn-primary text-lg px-10 py-4"
            >
              <Upload className="w-6 h-6" />
              UPLOAD IMAGE
            </button>

            <p className="mt-6 text-sm font-medium" style={{ color: "#666" }}>
              📁 Support JPG, PNG, WebP, BMP formats
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
                HOW TO REMOVE WATERMARKS
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

        {/* Feature Section 1 - Privacy */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--color-pixel-cream)" }}
        >
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
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
                  Unlike other online tools that upload your photos to remote
                  servers, our Watermark Remover processes everything directly
                  in your browser. Your images never leave your device, ensuring
                  complete privacy and data security.
                </p>
              </div>
              <div className="flex justify-center">
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
            </div>
          </div>
        </section>

        {/* Feature Section 2 - Formats */}
        <section className="py-16" style={{ backgroundColor: "white" }}>
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 flex justify-center">
                <div
                  className="pixel-card p-8"
                  style={{ backgroundColor: "var(--color-pixel-lavender)" }}
                >
                  <div className="grid grid-cols-3 gap-3">
                    {["JPG", "PNG", "GIF", "BMP", "WebP", "TIFF"].map(
                      (format) => (
                        <div
                          key={format}
                          className="pixel-border-sm px-3 py-2 text-center font-bold text-sm"
                          style={{ backgroundColor: "white" }}
                        >
                          {format}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div
                  className="inline-block pixel-border-sm px-3 py-1 mb-4"
                  style={{ backgroundColor: "var(--color-pixel-yellow)" }}
                >
                  <span className="font-bold text-xs uppercase">
                    📁 Formats
                  </span>
                </div>
                <h2
                  className="pixel-title text-2xl md:text-3xl mb-4"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  MULTIPLE FORMATS SUPPORTED
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#454545" }}
                >
                  Our Free Online Watermark Remover supports almost all widely
                  used image formats, including JPG, JPEG, PNG, BMP, WebP, etc.
                  You can use this image watermark remover to remove watermarks
                  from any image according to your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Section 3 - Remove Anything */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--color-pixel-cream)" }}
        >
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-block pixel-border-sm px-3 py-1 mb-4"
                  style={{ backgroundColor: "var(--color-pixel-coral)" }}
                >
                  <span className="font-bold text-xs uppercase text-white">
                    ✨ Magic
                  </span>
                </div>
                <h2
                  className="pixel-title text-2xl md:text-3xl mb-4"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  REMOVE ANYTHING
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#454545" }}
                >
                  In addition to removing watermarks from pictures, our tool can
                  also help you remove logos, objects, people, text, captions,
                  emojis, stamps, dates, etc. from photos.
                </p>
              </div>
              <div className="flex justify-center">
                <div
                  className="pixel-card p-6"
                  style={{ backgroundColor: "var(--color-pixel-orange)" }}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {["Logo", "Text", "Date", "Stamp", "Emoji", "Object"].map(
                      (item) => (
                        <div
                          key={item}
                          className="pixel-border-sm w-16 h-16 flex items-center justify-center"
                          style={{ backgroundColor: "white" }}
                        >
                          <span className="text-xs font-bold">{item}</span>
                        </div>
                      )
                    )}
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
                style={{ backgroundColor: "var(--color-pixel-coral)" }}
              >
                <span className="font-bold text-sm uppercase text-white">
                  ⭐ Features
                </span>
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
          style={{ backgroundColor: "var(--color-pixel-coral)" }}
        >
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <h2 className="pixel-title text-3xl md:text-4xl text-white mb-4">
              READY TO START?
            </h2>
            <p className="text-white/90 mb-8 font-medium">
              Start removing watermarks from your images now. It's free, fast,
              and secure.
            </p>
            <button
              onClick={handleUploadClick}
              className="pixel-btn-secondary text-lg px-10 py-4"
            >
              START NOW - IT'S FREE
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
                style={{ backgroundColor: "var(--color-pixel-sky)" }}
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

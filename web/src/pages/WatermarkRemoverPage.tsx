import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// 步骤图标组件
const StepIcon1 = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="38" stroke="#e0e0e0" strokeWidth="2" />
    <path
      d="M30 35V45C30 46.1 30.9 47 32 47H48C49.1 47 50 46.1 50 45V35C50 33.9 49.1 33 48 33H32C30.9 33 30 33.9 30 35Z"
      stroke="#7b4aff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36 40H44M40 36V44"
      stroke="#7b4aff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const StepIcon2 = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="38" stroke="#e0e0e0" strokeWidth="2" />
    <path
      d="M32 32H48V48H32V32Z"
      stroke="#7b4aff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 2"
    />
    <path
      d="M36 36H44V44H36V36Z"
      fill="#7b4aff"
      fillOpacity="0.2"
      stroke="#7b4aff"
      strokeWidth="2"
    />
  </svg>
);

const StepIcon3 = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="40" cy="40" r="38" stroke="#e0e0e0" strokeWidth="2" />
    <path
      d="M40 32V44M40 44L35 39M40 44L45 39"
      stroke="#7b4aff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 48H48"
      stroke="#7b4aff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 特性图标
const FeatureIcon = ({ type }: { type: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    free: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#7b4aff]"
      >
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 14V34M18 20H30M18 28H26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    easy: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#7b4aff]"
      >
        <path
          d="M14 34L24 14L34 34H14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
    fast: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#7b4aff]"
      >
        <path
          d="M28 14L18 26H24L20 34L30 22H24L28 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    quality: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#7b4aff]"
      >
        <path
          d="M24 14L27 20L34 21L29 26L30 33L24 30L18 33L19 26L14 21L21 20L24 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    secure: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#7b4aff]"
      >
        <path
          d="M24 14L14 18V26C14 32 24 36 24 36C24 36 34 32 34 26V18L24 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M20 26L23 29L28 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    noads: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-[#7b4aff]"
      >
        <rect
          x="14"
          y="14"
          width="20"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M14 14L34 34M34 14L14 34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  };
  return iconMap[type] || iconMap.free;
};

// FAQ 组件
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
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 text-left text-[#1e1e1e] font-medium hover:text-[#7b4aff] transition-colors"
    >
      <span>{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-[#7b4aff]" />
      ) : (
        <ChevronDown className="w-5 h-5" />
      )}
    </button>
    {isOpen && (
      <div className="pb-4 text-[#454545] text-sm leading-relaxed">
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
      icon: <StepIcon1 />,
      title: "1. Add Image",
      description: 'Click "Upload Image" button to import your image file.',
    },
    {
      icon: <StepIcon2 />,
      title: "2. Remove Watermark",
      description: 'Select the watermark area and click "Remove" button.',
    },
    {
      icon: <StepIcon3 />,
      title: "3. Save Image",
      description: 'Click "Download" to save the watermark-free image.',
    },
  ];

  const features = [
    {
      type: "free",
      title: "Completely Free",
      description:
        "You can use this tool to remove watermarks from photos 100% free.",
    },
    {
      type: "easy",
      title: "Easy to Remove",
      description:
        "Clear guides and design make it easier to remove watermarks from images.",
    },
    {
      type: "fast",
      title: "Fast Removal",
      description: "The image watermark removal process is very fast.",
    },
    {
      type: "quality",
      title: "High Quality Output",
      description:
        "You can save images in high quality after removing watermarks.",
    },
    {
      type: "secure",
      title: "Security Guaranteed",
      description:
        "All processing is done locally, your images never leave your device.",
    },
    {
      type: "noads",
      title: "No Ads",
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
    <div className="min-h-screen bg-white pt-[66px]">
      {/* Hero Section with Upload Button */}
      <section className="py-16 bg-gradient-to-b from-[#f8f6ff] to-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#1e1e1e" }}
          >
            Free Online Watermark Remover
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Remove watermarks, logos, text, and unwanted objects from your
            images instantly. 100% free, no registration required, all
            processing done locally.
          </p>
          <Button
            onClick={handleUploadClick}
            className="px-10 py-6 text-lg font-semibold bg-[#7b4aff] hover:bg-[#6b3ae6] text-white shadow-xl hover:shadow-2xl transition-all duration-200 rounded-full"
          >
            📷 Upload Image to Start
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Support JPG, PNG, WebP, BMP formats
          </p>
        </div>
      </section>

      {/* How To Section */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: "#1e1e1e" }}
          >
            How to Remove Watermarks from Images
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "#1e1e1e" }}
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

      {/* Feature Section 1 */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#1e1e1e" }}
              >
                100% Local Processing, Zero Privacy Risk
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#454545" }}
              >
                Unlike other online tools that upload your photos to remote
                servers, our Watermark Remover processes everything directly in
                your browser. Your images never leave your device, ensuring
                complete privacy and data security. No server uploads, no cloud
                storage, no data collection. Your photos remain yours and yours
                alone. This local processing approach also means faster results
                with no waiting for uploads or downloads.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-emerald-500 rounded-2xl flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path
                        d="M24 8L14 14V24C14 32 24 38 24 38C24 38 34 32 34 24V14L24 8Z"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 24L22 28L30 20"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-emerald-600 font-medium">
                    100% Local & Private
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl flex items-center justify-center">
                <div className="flex flex-wrap gap-2 justify-center p-8">
                  {["JPG", "PNG", "GIF", "BMP", "WebP"].map((format) => (
                    <span
                      key={format}
                      className="px-4 py-2 bg-white rounded-lg shadow-sm text-[#7b4aff] font-medium"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#1e1e1e" }}
              >
                Support Multiple Image Formats
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#454545" }}
              >
                Our Free Online Watermark Remover supports almost all widely
                used image formats, including JPG, JPEG, PNG, BMP, WebP, etc.
                You can use this image watermark remover to remove watermarks
                from any image according to your needs, which makes your
                watermark removal more convenient and faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ color: "#1e1e1e" }}
              >
                Remove Any Unwanted Things from Pictures
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#454545" }}
              >
                In addition to removing watermarks from pictures, our Free
                Online Watermark Remover can also help you remove logos,
                objects, people, text, captions, emojis, stamps, dates, etc.
                from photos. For example, some cameras leave dates or stamps on
                captured photos, and you can use our Watermark Remover to select
                the date or stamp area and remove it from the photo.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md h-64 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 p-8">
                  {["Logo", "Text", "Date", "Stamp", "Emoji", "Object"].map(
                    (item) => (
                      <div
                        key={item}
                        className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center"
                      >
                        <span className="text-xs text-[#7b4aff] font-medium">
                          {item}
                        </span>
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
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: "#1e1e1e" }}
          >
            Why Choose Our Free Online Watermark Remover
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <FeatureIcon type={feature.type} />
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#1e1e1e" }}
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7b4aff] to-[#9b6dff]">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Remove Watermarks?
          </h2>
          <p className="text-white/80 mb-8">
            Start removing watermarks from your images now. It's free, fast, and
            secure.
          </p>
          <Button
            onClick={handleUploadClick}
            className="px-10 py-6 text-lg font-semibold bg-white text-[#7b4aff] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-200 rounded-full"
          >
            Start Now - It's Free
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: "#1e1e1e" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
  );
}

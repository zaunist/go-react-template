import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the Terms of Service for MDZZ Toolbox. Understand our usage guidelines and policies for our free online image tools."
        canonicalUrl="/terms"
      />
      <div
        className="min-h-screen pt-[66px]"
        style={{ backgroundColor: "var(--color-pixel-cream)" }}
      >
        <div className="max-w-[800px] mx-auto px-4 py-12">
          {/* Back Button - 像素风格 */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 pixel-border-sm px-4 py-2 font-bold text-sm uppercase hover:translate-x-1 hover:translate-y-1 transition-transform"
              style={{ backgroundColor: "var(--color-pixel-mint)" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* Page Title - 像素风格 */}
          <div className="text-center mb-12">
            <div
              className="inline-block pixel-border-sm px-4 py-2 mb-4"
              style={{ backgroundColor: "var(--color-pixel-coral)" }}
            >
              <span className="font-bold text-sm uppercase text-white">
                📜 Legal
              </span>
            </div>
            <h1
              className="pixel-title text-4xl md:text-5xl mb-4"
              style={{ color: "var(--color-pixel-black)" }}
            >
              TERMS OF SERVICE
            </h1>
            <p className="text-sm font-medium" style={{ color: "#666" }}>
              Last updated: {new Date().toLocaleDateString("en-US")}
            </p>
          </div>

          {/* Content - 像素风格 */}
          <div className="space-y-6">
            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                1. ACCEPTANCE OF TERMS
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                By accessing and using our services, you agree to be bound by
                these Terms of Service. If you do not agree to these terms,
                please do not use our services.
              </p>
            </section>

            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                2. SERVICE DESCRIPTION
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                We provide online watermark removal and image processing
                services. We reserve the right to modify, suspend, or terminate
                any part of the service at any time without prior notice.
              </p>
            </section>

            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                3. USER RESPONSIBILITIES
              </h2>
              <div
                className="text-sm leading-relaxed space-y-4"
                style={{ color: "#454545" }}
              >
                <p>As a user, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate registration information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not use the service for illegal purposes</li>
                  <li>Respect intellectual property rights of others</li>
                  <li>Not upload malicious content or viruses</li>
                </ul>
              </div>
            </section>

            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                4. INTELLECTUAL PROPERTY
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                All content, trademarks, and intellectual property of the
                service belong to us or our licensors. Without explicit
                authorization, you may not copy, modify, distribute, or use any
                content.
              </p>
            </section>

            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                5. LIMITATION OF LIABILITY
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                The service is provided "as is" without any express or implied
                warranties. We shall not be liable for any direct, indirect,
                incidental, or consequential damages arising from your use of
                the service.
              </p>
            </section>

            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                6. CHANGES TO TERMS
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                We reserve the right to modify these terms at any time. Modified
                terms will be posted on this page. Continued use of the service
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section
              className="pixel-card p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="pixel-title text-xl mb-4"
                style={{ color: "var(--color-pixel-black)" }}
              >
                7. CONTACT US
              </h2>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                <p>
                  If you have any questions about these Terms, please contact
                  us:
                </p>
                <p className="mt-4 font-bold">Email: support@mdzz.uk</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

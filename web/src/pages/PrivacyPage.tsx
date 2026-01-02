import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how MDZZ Toolbox protects your privacy. All image processing is done locally in your browser - we never upload or store your files."
        canonicalUrl="/privacy"
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
              style={{ backgroundColor: "var(--color-pixel-teal)" }}
            >
              <span className="font-bold text-sm uppercase">🔒 Legal</span>
            </div>
            <h1
              className="pixel-title text-4xl md:text-5xl mb-4"
              style={{ color: "var(--color-pixel-black)" }}
            >
              PRIVACY POLICY
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
                1. INFORMATION COLLECTION
              </h2>
              <div
                className="text-sm leading-relaxed space-y-4"
                style={{ color: "#454545" }}
              >
                <p>
                  We collect information you provide when using our services,
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account information (username, email address, etc.)</li>
                  <li>Usage data (access logs, operation records, etc.)</li>
                  <li>Device information (IP address, browser type, etc.)</li>
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
                2. INFORMATION USAGE
              </h2>
              <div
                className="text-sm leading-relaxed space-y-4"
                style={{ color: "#454545" }}
              >
                <p>We use the collected information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our services</li>
                  <li>Process your requests and transactions</li>
                  <li>Send important notifications and updates</li>
                  <li>Ensure service security and prevent fraud</li>
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
                3. INFORMATION PROTECTION
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                We employ industry-standard security measures to protect your
                personal information, including encrypted storage, access
                control, and regular security audits. We do not sell, trade, or
                transfer your personal information to third parties.
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
                4. COOKIE USAGE
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                We use Cookies and similar technologies to improve user
                experience, analyze website usage, and provide personalized
                content. You can control the use of Cookies through your browser
                settings.
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
                5. YOUR RIGHTS
              </h2>
              <div
                className="text-sm leading-relaxed space-y-4"
                style={{ color: "#454545" }}
              >
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and related data</li>
                  <li>Restrict or object to certain data processing</li>
                  <li>Data portability</li>
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
                6. CONTACT US
              </h2>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                <p>
                  If you have any questions about this Privacy Policy or need to
                  exercise your rights, please contact us via:
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

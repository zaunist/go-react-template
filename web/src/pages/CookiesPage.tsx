import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function CookiesPage() {
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Learn about how MDZZ Toolbox uses cookies. We use minimal cookies to improve your experience."
        canonicalUrl="/cookies"
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
              style={{ backgroundColor: "var(--color-pixel-yellow)" }}
            >
              <span className="font-bold text-sm uppercase">🍪 Legal</span>
            </div>
            <h1
              className="pixel-title text-4xl md:text-5xl mb-4"
              style={{ color: "var(--color-pixel-black)" }}
            >
              COOKIE POLICY
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
                WHAT ARE COOKIES?
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                Cookies are small text files stored on your device when you
                visit a website. They are widely used to make websites work or
                work more efficiently, as well as to provide information to the
                owners of the site.
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
                HOW WE USE COOKIES
              </h2>
              <div
                className="text-sm leading-relaxed space-y-4"
                style={{ color: "#454545" }}
              >
                <p>We use Cookies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Keep you logged in</li>
                  <li>Remember your preferences</li>
                  <li>Analyze website usage</li>
                  <li>Improve user experience</li>
                  <li>Provide personalized content</li>
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
                TYPES OF COOKIES
              </h2>
              <div
                className="text-sm leading-relaxed space-y-6"
                style={{ color: "#454545" }}
              >
                <div
                  className="pixel-border-sm p-4"
                  style={{ backgroundColor: "var(--color-pixel-cream)" }}
                >
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    Essential Cookies
                  </h3>
                  <p>
                    These Cookies are necessary for the basic functioning of the
                    website, including user authentication and security
                    features.
                  </p>
                </div>
                <div
                  className="pixel-border-sm p-4"
                  style={{ backgroundColor: "var(--color-pixel-cream)" }}
                >
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    Functional Cookies
                  </h3>
                  <p>
                    These Cookies allow the website to remember your choices and
                    provide enhanced personalized features.
                  </p>
                </div>
                <div
                  className="pixel-border-sm p-4"
                  style={{ backgroundColor: "var(--color-pixel-cream)" }}
                >
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "var(--color-pixel-black)" }}
                  >
                    Analytics Cookies
                  </h3>
                  <p>
                    These Cookies help us understand how visitors interact with
                    the website by collecting and reporting information
                    anonymously.
                  </p>
                </div>
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
                MANAGING COOKIES
              </h2>
              <div
                className="text-sm leading-relaxed space-y-4"
                style={{ color: "#454545" }}
              >
                <p>You can control and manage Cookies in the following ways:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Delete or block Cookies through browser settings</li>
                  <li>Set your browser to notify you before setting Cookies</li>
                  <li>Use browser's privacy mode</li>
                  <li>Use third-party Cookie management tools</li>
                </ul>
                <p
                  className="mt-4 font-medium"
                  style={{ color: "var(--color-pixel-coral)" }}
                >
                  Please note that disabling certain Cookies may affect the
                  functionality of the website.
                </p>
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
                CONTACT US
              </h2>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "#454545" }}
              >
                <p>
                  If you have any questions about our Cookie Policy, please
                  contact us:
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

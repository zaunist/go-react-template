import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-[66px]">
      <div className="max-w-[800px] mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-[#7b4aff] hover:text-[#6b3ae0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e1e1e]">
            Cookie Policy
          </h1>
          <p className="text-[#999] text-base">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              What are Cookies?
            </h2>
            <p className="text-[#454545] leading-relaxed">
              Cookies are small text files stored on your device when you visit
              a website. They are widely used to make websites work or work more
              efficiently, as well as to provide information to the owners of
              the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              How We Use Cookies
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-4">
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

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              Types of Cookies
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#1e1e1e]">
                  Essential Cookies
                </h3>
                <p>
                  These Cookies are necessary for the basic functioning of the
                  website, including user authentication and security features.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#1e1e1e]">
                  Functional Cookies
                </h3>
                <p>
                  These Cookies allow the website to remember your choices and
                  provide enhanced personalized features.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#1e1e1e]">
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

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              Managing Cookies
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-4">
              <p>You can control and manage Cookies in the following ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Delete or block Cookies through browser settings</li>
                <li>Set your browser to notify you before setting Cookies</li>
                <li>Use browser's privacy mode</li>
                <li>Use third-party Cookie management tools</li>
              </ul>
              <p>
                Please note that disabling certain Cookies may affect the
                functionality of the website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              Contact Us
            </h2>
            <div className="text-[#454545] leading-relaxed">
              <p>
                If you have any questions about our Cookie Policy, please
                contact us:
              </p>
              <p className="mt-4">Email: support@MDZZ.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

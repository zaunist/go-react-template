import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[#999] text-base">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              1. Information Collection
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-4">
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

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              2. Information Usage
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-4">
              <p>We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Process your requests and transactions</li>
                <li>Send important notifications and updates</li>
                <li>Ensure service security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              3. Information Protection
            </h2>
            <p className="text-[#454545] leading-relaxed">
              We employ industry-standard security measures to protect your
              personal information, including encrypted storage, access control,
              and regular security audits. We do not sell, trade, or transfer
              your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              4. Cookie Usage
            </h2>
            <p className="text-[#454545] leading-relaxed">
              We use Cookies and similar technologies to improve user
              experience, analyze website usage, and provide personalized
              content. You can control the use of Cookies through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              5. Your Rights
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and related data</li>
                <li>Restrict or object to certain data processing</li>
                <li>Data portability</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              6. Contact Us
            </h2>
            <div className="text-[#454545] leading-relaxed">
              <p>
                If you have any questions about this Privacy Policy or need to
                exercise your rights, please contact us via:
              </p>
              <p className="mt-4">Email: support@MDZZ.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

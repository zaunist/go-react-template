import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-[#999] text-base">
            Last updated: {new Date().toLocaleDateString("en-US")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              1. Acceptance of Terms
            </h2>
            <p className="text-[#454545] leading-relaxed">
              By accessing and using our services, you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              2. Service Description
            </h2>
            <p className="text-[#454545] leading-relaxed">
              We provide online watermark removal and image processing services.
              We reserve the right to modify, suspend, or terminate any part of
              the service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              3. User Responsibilities
            </h2>
            <div className="text-[#454545] leading-relaxed space-y-4">
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

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              4. Intellectual Property
            </h2>
            <p className="text-[#454545] leading-relaxed">
              All content, trademarks, and intellectual property of the service
              belong to us or our licensors. Without explicit authorization, you
              may not copy, modify, distribute, or use any content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              5. Limitation of Liability
            </h2>
            <p className="text-[#454545] leading-relaxed">
              The service is provided "as is" without any express or implied
              warranties. We shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from your use of the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              6. Changes to Terms
            </h2>
            <p className="text-[#454545] leading-relaxed">
              We reserve the right to modify these terms at any time. Modified
              terms will be posted on this page. Continued use of the service
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[#1e1e1e]">
              7. Contact Us
            </h2>
            <div className="text-[#454545] leading-relaxed">
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <p className="mt-4">Email: support@MDZZ.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

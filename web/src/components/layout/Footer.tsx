import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const productLinks = [
    { label: "Free Watermark Remover", path: "/tools/watermark-remover" },
  ];

  const companyLinks = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms and Conditions", path: "/terms" },
  ];

  // const supportLinks = [
  //   { label: "Support", path: "/support" },
  //   { label: "Contact", path: "/contact" },
  //   { label: "FAQ", path: "/faq" },
  // ];

  return (
    <footer className="bg-[#1e1e1e] text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/vite.svg" alt="MDZZ" className="w-10 h-10 invert" />
              <span className="font-semibold text-xl text-white">MDZZ</span>
            </Link>
          </div>

          {/* Hot Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hot Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-[#999] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-[#999] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Contact */}
          {/* <div>
            <h3 className="text-white font-semibold mb-4">Help & Contact</h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-[#999] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#333] text-center">
          <p className="text-gray-400 text-sm">
            Copyright © {new Date().getFullYear()} MDZZ Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

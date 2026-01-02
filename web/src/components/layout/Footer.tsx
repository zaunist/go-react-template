import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const productLinks = [
    { label: "Watermark Remover", path: "/tools/watermark-remover" },
    { label: "Image Converter", path: "/tools/image-converter" },
  ];

  const companyLinks = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
  ];

  return (
    <footer className="pixel-footer pt-12">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pixel-yellow border-3 border-white flex items-center justify-center text-xl">
                🎮
              </div>
              <span className="font-black text-2xl text-white uppercase tracking-wider">
                MDZZ
              </span>
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Free online tools for all your image processing needs. 100% local,
              100% private.
            </p>
            {/* Pixel decorations */}
            <div className="flex gap-2 pt-2">
              <span className="w-3 h-3 bg-pixel-coral"></span>
              <span className="w-3 h-3 bg-pixel-yellow"></span>
              <span className="w-3 h-3 bg-pixel-mint"></span>
              <span className="w-3 h-3 bg-pixel-lavender"></span>
              <span className="w-3 h-3 bg-pixel-sky"></span>
            </div>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="pixel-footer-title">Free Tools</h3>
            <ul className="space-y-1 mt-6">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="pixel-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="pixel-footer-title">Company</h3>
            <ul className="space-y-1 mt-6">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="pixel-footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="pixel-footer-title">Connect</h3>
            <div className="mt-6 space-y-3">
              <a
                href="https://github.com/zaunist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 bg-pixel-lavender border-2 border-white flex items-center justify-center text-sm group-hover:bg-pixel-coral transition-colors">
                  ⌘
                </span>
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Pixel Divider */}
        <div className="mt-12 pt-8 relative">
          <div className="pixel-divider-dashed bg-gray-700 h-1 mb-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm font-medium">
              © {new Date().getFullYear()} MDZZ Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-xs font-medium">
              <span>Made with</span>
              <span className="text-pixel-coral animate-pulse">♥</span>
              <span>and pixels</span>
              <span className="text-pixel-yellow">✦</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

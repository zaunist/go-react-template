import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Menu, X, ChevronDown } from "lucide-react";

// 控制是否启用用户登录注册功能
const ENABLE_AUTH = false;

interface NavChild {
  label: string;
  path: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  hasDropdown: boolean;
  children: NavChild[];
}

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    {
      label: "Free Tools",
      hasDropdown: true,
      children: [
        {
          label: "Watermark Remover",
          path: "/tools/watermark-remover",
          external: false,
        },
        {
          label: "Image Converter",
          path: "/tools/image-converter",
          external: false,
        },
      ],
    },
    {
      label: "More Tools",
      hasDropdown: true,
      children: [
        {
          label: "XUGOU--free sys monitor",
          path: "https://github.com/zaunist/xugou",
          external: true,
        },
        {
          label: "ZMAIL--temp mail",
          path: "https://mail.mdzz.uk",
          external: true,
        },
      ],
    },
  ];

  return (
    <header className="pixel-header">
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="pixel-logo">
          <div className="pixel-logo-icon">
            <span className="text-lg">🎮</span>
          </div>
          <span className="hidden sm:block tracking-wider">MDZZ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() =>
                item.hasDropdown && setActiveDropdown(item.label)
              }
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="pixel-nav-item flex items-center gap-1"
                aria-expanded={activeDropdown === item.label}
                aria-haspopup="true"
              >
                <span>★</span>
                {item.label}
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {item.hasDropdown && activeDropdown === item.label && (
                <div className="pixel-nav-dropdown">
                  {item.children?.map((child, childIndex) =>
                    child.external ? (
                      <a
                        key={childIndex}
                        href={child.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-nav-dropdown-item"
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className="pixel-nav-dropdown-item"
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section - Login */}
        <div className="flex items-center gap-3">
          {ENABLE_AUTH && (
            <>
              {user ? (
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-sm font-bold text-pixel-black">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="pixel-btn-sm pixel-btn-outline text-xs"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block pixel-btn-sm bg-pixel-yellow text-pixel-black"
                >
                  Login
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden pixel-icon-box-sm bg-pixel-yellow"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-pixel-black" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-pixel-black" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t-4 border-pixel-black"
          style={{ boxShadow: "0 4px 0 0 var(--color-pixel-black)" }}
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <div key={index}>
                <div className="py-2 font-black uppercase text-sm text-pixel-black flex items-center gap-2">
                  <span className="text-pixel-coral">►</span>
                  {item.label}
                </div>
                <div className="pl-6 space-y-1 border-l-4 border-pixel-yellow ml-2">
                  {item.children.map((child, childIndex) =>
                    child.external ? (
                      <a
                        key={childIndex}
                        href={child.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 text-sm font-medium text-gray-700 hover:text-pixel-coral hover:pl-2 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className="block py-2 text-sm font-medium text-gray-700 hover:text-pixel-coral hover:pl-2 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
            {ENABLE_AUTH && (
              <div className="pt-4 border-t-2 border-dashed border-gray-200">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="pixel-btn-secondary w-full text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="pixel-btn-primary w-full text-sm text-center block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

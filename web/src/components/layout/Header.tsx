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
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ height: "66px", borderBottom: "1px solid #f0f0f0" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <img src="/vite.svg" alt="MDZZ" className="w-8 h-8" />
            <span
              className="font-semibold text-lg hidden sm:block"
              style={{ color: "#1e1e1e" }}
            >
              MDZZ
            </span>
          </div>
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
                className="flex items-center gap-1 px-4 py-2 text-[#1e1e1e] text-base font-medium hover:text-[#7b4aff] transition-colors"
                aria-expanded={activeDropdown === item.label}
                aria-haspopup="true"
              >
                {item.label}
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {item.hasDropdown && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-0 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px]">
                  {item.children?.map((child, childIndex) =>
                    child.external ? (
                      <a
                        key={childIndex}
                        href={child.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-[#454545] text-sm hover:bg-gray-50 hover:text-[#7b4aff] transition-colors"
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className="block px-4 py-2 text-[#454545] text-sm hover:bg-gray-50 hover:text-[#7b4aff] transition-colors"
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
                  <span className="text-sm text-[#454545]">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-[#454545] text-base hover:text-[#7b4aff] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block text-[#454545] text-base hover:text-[#7b4aff] transition-colors"
                >
                  Login
                </Link>
              )}
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#454545] hover:text-[#7b4aff] transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg"
          aria-label="Mobile navigation"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item, index) => (
              <div key={index}>
                <div className="py-2 text-[#1e1e1e] text-base font-medium">
                  {item.label}
                </div>
                <div className="pl-4 space-y-1">
                  {item.children.map((child, childIndex) =>
                    child.external ? (
                      <a
                        key={childIndex}
                        href={child.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-1.5 text-[#454545] text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link
                        key={childIndex}
                        to={child.path}
                        className="block py-1.5 text-[#454545] text-sm"
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
              <div className="pt-4 border-t border-gray-100">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-[#454545] text-base"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2 text-[#454545] text-base"
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

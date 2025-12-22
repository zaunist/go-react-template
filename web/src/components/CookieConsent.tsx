import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 检查是否已经接受过 cookie 政策
    const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasAccepted) {
      // 延迟显示，避免页面加载时闪烁
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center"
      style={{
        animation: "slideUp 0.3s ease-out",
      }}
    >
      <div
        className="flex items-center justify-center gap-2 px-6 py-2 text-sm text-white"
        style={{
          backgroundColor: "rgba(74, 81, 78, 0.85)",
          backdropFilter: "blur(8px)",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <span>
          We use cookies to ensure you get the best experience on our website.{" "}
        </span>
        <Link
          to="/privacy"
          className="text-white underline hover:text-gray-200 transition-colors"
        >
          Privacy Policy
        </Link>
        <Button
          onClick={handleAccept}
          variant="primary"
          size="sm"
          className="ml-4"
        >
          Got it
        </Button>
      </div>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

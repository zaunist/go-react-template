import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { userApi, type LoginRequest } from "@/api";
import SEO from "@/components/SEO";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await userApi.login(formData);
      if (response.code === 0 && response.data) {
        login(response.data.user);
        navigate(from, { replace: true });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await userApi.googleLogin({ id_token: credential });
      if (response.code === 0 && response.data) {
        login(response.data.user);
        navigate(from, { replace: true });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id:
            import.meta.env.VITE_GOOGLE_CLIENT_ID ||
            "586271718950-aebomfd3uvj2uofs81nkvtiu4meaggmn.apps.googleusercontent.com",
          callback: (response: any) => {
            handleGoogleLogin(response.credential);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "rectangular",
            text: "continue_with",
            logo_alignment: "left",
          });
        }
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }, []);

  return (
    <>
      <SEO
        title="Login"
        description="Sign in to your MDZZ Toolbox account to access your dashboard and saved projects."
        canonicalUrl="/login"
        noindex={true}
      />
      <div
        className="min-h-screen pt-[66px] flex items-center justify-center"
        style={{ backgroundColor: "var(--color-pixel-cream)" }}
      >
        <div className="w-full max-w-md mx-4">
          <div className="pixel-card p-8" style={{ backgroundColor: "white" }}>
            {/* Header - 像素风格 */}
            <div className="text-center mb-8">
              <div
                className="inline-block pixel-border-sm px-4 py-2 mb-4"
                style={{ backgroundColor: "var(--color-pixel-sky)" }}
              >
                <span className="font-bold text-sm uppercase">👋 Welcome</span>
              </div>
              <h1
                className="pixel-title text-3xl mb-2"
                style={{ color: "var(--color-pixel-black)" }}
              >
                SIGN IN
              </h1>
              <p className="text-sm" style={{ color: "#666" }}>
                Sign in to continue to your account
              </p>
            </div>

            {/* Form - 像素风格 */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold uppercase mb-2"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 text-sm transition-all focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-pixel-cream)",
                    border: "3px solid var(--color-pixel-black)",
                    boxShadow: "3px 3px 0px var(--color-pixel-black)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold uppercase mb-2"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 text-sm transition-all focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5"
                  style={{
                    backgroundColor: "var(--color-pixel-cream)",
                    border: "3px solid var(--color-pixel-black)",
                    boxShadow: "3px 3px 0px var(--color-pixel-black)",
                  }}
                />
              </div>

              {error && (
                <div
                  className="text-sm font-bold p-3 pixel-border-sm"
                  style={{
                    backgroundColor: "var(--color-pixel-coral)",
                    color: "white",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-bold uppercase text-sm transition-all hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed pixel-border-sm"
                style={{
                  backgroundColor: "var(--color-pixel-coral)",
                  color: "white",
                }}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            {/* Divider - 像素风格 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full"
                  style={{ borderTop: "2px dashed var(--color-pixel-black)" }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-4 font-bold uppercase text-xs"
                  style={{ backgroundColor: "white", color: "#666" }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <div className="flex justify-center mb-6" ref={googleButtonRef} />

            {/* Register Link - 像素风格 */}
            <div className="text-center text-sm">
              <span style={{ color: "#666" }}>Don't have an account? </span>
              <Link
                to="/register"
                className="font-bold uppercase hover:underline transition-all"
                style={{ color: "var(--color-pixel-teal)" }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

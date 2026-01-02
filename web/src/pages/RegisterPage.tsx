import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { userApi, type RegisterRequest } from "@/api";
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

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await userApi.register(formData);
      if (response.code === 0 && response.data) {
        login(response.data);
        navigate("/dashboard", { replace: true });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
        navigate("/dashboard", { replace: true });
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
        title="Sign Up"
        description="Create a free MDZZ Toolbox account to save your projects and access all features."
        canonicalUrl="/register"
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
                style={{ backgroundColor: "var(--color-pixel-mint)" }}
              >
                <span className="font-bold text-sm uppercase">
                  ✨ New Here?
                </span>
              </div>
              <h1
                className="pixel-title text-3xl mb-2"
                style={{ color: "var(--color-pixel-black)" }}
              >
                CREATE ACCOUNT
              </h1>
              <p className="text-sm" style={{ color: "#666" }}>
                Sign up to get started
              </p>
            </div>

            {/* Form - 像素风格 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-bold uppercase mb-2"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
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
                  placeholder="Create a password"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-bold uppercase mb-2"
                  style={{ color: "var(--color-pixel-black)" }}
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  backgroundColor: "var(--color-pixel-teal)",
                  color: "white",
                }}
              >
                {loading ? "Creating account..." : "Create Account →"}
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

            {/* Login Link - 像素风格 */}
            <div className="text-center text-sm">
              <span style={{ color: "#666" }}>Already have an account? </span>
              <Link
                to="/login"
                className="font-bold uppercase hover:underline transition-all"
                style={{ color: "var(--color-pixel-coral)" }}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

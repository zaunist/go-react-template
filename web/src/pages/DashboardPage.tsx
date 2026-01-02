import { useAuthStore } from "@/store/authStore";
import { User, Settings, LogOut } from "lucide-react";
import SEO from "@/components/SEO";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <SEO
        title="Dashboard"
        description="Your MDZZ Toolbox dashboard. Manage your account and access all tools."
        canonicalUrl="/dashboard"
        noindex={true}
      />
      <div className="min-h-screen bg-[#fafafa] pt-[66px]">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#1e1e1e] mb-2">
                  Welcome back, {user?.username || "User"}!
                </h1>
                <p className="text-[#666]">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[#666] hover:text-[#1e1e1e] border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(225deg, #f37e8d 0%, #e352f5 48%, #a3ccfb 100%)",
                  }}
                >
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[#666] text-sm">Account Status</p>
                  <p className="text-[#1e1e1e] text-xl font-semibold">Active</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[#666] text-sm">Images Processed</p>
                  <p className="text-[#1e1e1e] text-xl font-semibold">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-[#666] text-sm">Plan</p>
                  <p className="text-[#1e1e1e] text-xl font-semibold">Free</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-semibold text-[#1e1e1e] mb-6">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-[#666]">Username</span>
                <span className="text-[#1e1e1e] font-medium">
                  {user?.username || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-[#666]">Email</span>
                <span className="text-[#1e1e1e] font-medium">
                  {user?.email || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[#666]">Member Since</span>
                <span className="text-[#1e1e1e] font-medium">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#1e1e1e] mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/"
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(225deg, #f37e8d 0%, #e352f5 48%, #a3ccfb 100%)",
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1e1e1e] font-semibold group-hover:text-[#7b4aff] transition-colors">
                      Remove Watermark
                    </p>
                    <p className="text-[#666] text-sm">
                      Start removing watermarks from your images
                    </p>
                  </div>
                </div>
              </a>

              <div className="bg-white rounded-2xl shadow-sm p-6 opacity-60">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#1e1e1e] font-semibold">
                      More Features
                    </p>
                    <p className="text-[#666] text-sm">Coming soon...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react"
import { Button } from "../../components/Button"
import { useAuth } from "../../hooks/useAuth"

export default function LoginPage() {
  const [activeTab] = useState<"login" | "register">("register")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth();

  const handleLogin = async () => {
    
    
    try {
      const response = await login({ username: user, password });
      if (response) {
        // Handle successful login
        alert(`Login successful ${response}`);
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {/* Main content container - column on mobile, row on desktop */}
      <div className="flex w-full max-w-xs flex-col items-center rounded-xl bg-white pb-6 shadow-md md:max-w-4xl md:flex-row md:items-stretch md:pb-0 md:shadow-lg">
        {/* Left side with logo - full width on mobile, 40% width on desktop */}
        <div className="flex w-full items-center justify-center py-6 md:w-2/5 md:bg-[#f8f8fa] md:py-12">
          <div className="w-45 md:w-4/5">
            <img src="/logo_clinic.png" alt="Jimirene Diagnostic & Maternity Clinic" className="h-auto w-full" />
            <h1 className="mt-4 hidden text-center text-xl font-bold text-gray-800 md:block">
              Jimirene Diagnostic & Maternity Clinic
            </h1>
          </div>
        </div>

        {/* Right side with form - full width on mobile, 60% width on desktop */}
        <div className="flex w-full flex-col items-center px-4 md:w-3/5 md:items-start md:justify-center md:px-12 md:py-8">
          {/* Tabs */}
          <div className="mb-6 flex w-full max-w-xs gap-2 md:max-w-md">
          </div>

          {/* Form */}
          <div className="w-full max-w-xs rounded-lg bg-[#ffffff] md:max-w-md">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:text-left">
              Member Log In
            </h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-800">
                  Username
                </label>
                <input
                  type="username"
                  id="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="example@user.com"
                  className="w-full rounded-full border-0 bg-[#white] px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#AEA4BF]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-wht-800">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="example123"
                  className="w-full rounded-full border-0 bg-[#white] px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#AEA4BF]"
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <img src="/google_icon.png" alt="Google" className="h-5 w-5" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <img src="/fb_icon.png" alt="Facebook" className="h-5 w-5" />
                  Facebook
                </button>
              </div>

                <div className="pt-2 flex justify-center">
                  <Button
                  className={`rounded-lg px-6 py-2 text-sm font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  activeTab === "login"
                  ? "bg-[#AEA4BF] text-black hover:bg-[#9d91b0] focus:ring-[#AEA4BF]"
                  : "bg-[#AEA4BF] text-black hover:bg-[#9d91b0] focus:ring-[#AEA4BF]"
                  }`}
                  label={activeTab === "login" ? "Login" : "Create"}
                  onClick={handleLogin}
                />
                </div>
                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-[#AEA4BF] hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add logic to handle forgot password
                      console.log("Forgot password clicked");
                    }}
                  >
                    Forgot your password?
                  </a>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

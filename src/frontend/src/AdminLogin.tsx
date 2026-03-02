import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  User,
} from "lucide-react";
import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate brief loading
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (
      username === "global Pride international school" &&
      password === "gpis@12345"
    ) {
      localStorage.setItem("gpis_admin_auth", "true");
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-dark via-school-green/90 to-school-dark flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-school-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-school-green/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-school-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Admissions Banner */}
        <div className="admission-banner text-center py-2.5 px-4 rounded-t-2xl font-display font-bold text-sm text-school-dark tracking-wide">
          🎓 Admissions Open 2026–2027 · Enroll Now!
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-b-2xl shadow-2xl border border-white/20 p-8">
          {/* School Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src="/assets/uploads/image-1.png"
                  alt="Global Pride International School Logo"
                  className="w-20 h-20 object-contain rounded-full border-4 border-school-gold shadow-golden"
                  onError={(e) => {
                    // Fallback to icon if image fails
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-school-green rounded-full flex items-center justify-center border-2 border-white">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
            <h1 className="font-display font-bold text-xl text-school-dark leading-tight mb-1">
              Global Pride International School
            </h1>
            <p className="text-sm font-semibold text-school-green/80 flex items-center justify-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              Admin Panel — Admissions 2026-2027
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="font-semibold text-school-dark text-sm"
              >
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  required
                  className="pl-10 border-border focus:border-school-green focus:ring-2 focus:ring-school-green/20 h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="font-semibold text-school-dark text-sm"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  className="pl-10 pr-10 border-border focus:border-school-green focus:ring-2 focus:ring-school-green/20 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-school-green hover:bg-school-green/90 text-white font-display font-bold text-base h-12 rounded-xl shadow-card transition-all hover:shadow-card-hover mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Login to Admin Panel"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <a
              href="/"
              className="text-sm text-foreground/50 hover:text-school-green transition-colors font-medium"
            >
              ← Back to School Website
            </a>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-4">
          Restricted area · Authorised personnel only
        </p>
      </div>
    </div>
  );
}

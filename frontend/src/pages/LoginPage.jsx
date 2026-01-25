import React, { useState } from "react";
import {
  Phone,
  Mail,
  Loader,
  Check,
  ArrowRight,
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handlePhoneSubmit = async () => {
    try {
      setOtpLoading(true);
      setError("");

      if (!phone || phone.length < 10) {
        setError("Please enter a valid phone number");
        setOtpLoading(false);
        return;
      }

      // Simulate API call
      setTimeout(() => {
        setOtpSent(true);
        setError("");
        setOtpLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
      setOtpLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setOtpLoading(false);
      setError("");

      if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setOtpLoading(false);
        return;
      }

      // Simulate API call
      setTimeout(() => {
        setError("");
        setOtpLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message || "Invalid OTP");
      setOtpLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      // Simulate API call
      setTimeout(() => {
        setGoogleLoading(true);
      }, 1500);
    } catch (err) {
      setError(err.message || "Google login failed");
      setGoogleLoading(true);
    }
  };

  const handleBackToPhone = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-4 lg:p-8 border border-gray-100">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="bg-emerald-500 p-3 rounded-lg">
            <TrendingUp className="text-white" size={28} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Expense Tracker
            </h1>
            <p className="text-gray-500 text-lg mt-2">Welcome Back</p>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to your ExpenseTracker account
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <div className="text-red-500 mt-0.5">⚠️</div>
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Login Methods Tabs */}

        {/* Phone Authentication */}

        <div className="space-y-6">
          {!otpSent ? (
            <>
              {/* Phone Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400 text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  We'll send you an OTP to verify
                </p>
              </div>

              {/* Send OTP Button */}
              <button
                onClick={handlePhoneSubmit}
                disabled={otpLoading || googleLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:shadow-lg active:scale-95"
              >
                {otpLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    Send OTP
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Enter OTP
                </label>
                <p className="text-xs text-gray-500 mb-4 ml-1">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-gray-700">{phone}</span>
                </p>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500">
                    🔐
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength="6"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400 text-2xl tracking-[0.5em] font-semibold text-center text-gray-900"
                  />
                </div>
              </div>

              {/* Verify OTP Button */}
              <button
                onClick={handleOtpSubmit}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Verify OTP
                  </>
                )}
              </button>

              {/* Change Phone Button */}
              <button
                onClick={handleBackToPhone}
                className="w-full text-emerald-600 hover:text-emerald-700 font-semibold py-2.5 text-sm transition-colors duration-200 hover:bg-emerald-50 rounded-lg"
              >
                Change Phone Number
              </button>
            </>
          )}
        </div>

        {/* Google Authentication */}

        <div className="flex items-center gap-4 my-5">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-400 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        <div className="space-y-4 mt-2">
          <button
            onClick={handleGoogleLogin}
            disabled={otpLoading || googleLoading}
            className="w-full border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-gray-900 font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-95"
          >
            {googleLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

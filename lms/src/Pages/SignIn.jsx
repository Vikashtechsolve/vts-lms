import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.identifier || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Extract email from identifier (could be email or phone)
      const email = form.identifier.includes("@") 
        ? form.identifier 
        : form.identifier; // If phone, backend will handle it

      const result = await login(email, form.password);
      
      if (result.success) {
        // Check subscription status before redirecting
        try {
          const subscriptionResponse = await subscriptionAPI.getStatus();
          const hasActiveSubscription = 
            subscriptionResponse.status === "active" && 
            subscriptionResponse.endAt && 
            new Date(subscriptionResponse.endAt) > new Date();

          if (hasActiveSubscription) {
            // User has active subscription - redirect to LMS
            navigate("/app");
          } else {
            // User doesn't have subscription - redirect to plan chooser
            navigate("/planChooser");
          }
        } catch (err) {
          console.error("Subscription check error:", err);
          // If subscription check fails, redirect to plan chooser to be safe
          navigate("/planChooser");
        }
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0b0b] to-[#0b0b0b] px-4">
      <div className="max-w-md w-full bg-[#141414] rounded-2xl p-8 shadow-[0_6px_20px_rgba(0,0,0,0.6)] text-white">
        {/* Title */}
        <h1 className="text-center text-2xl font-semibold mb-3">Sign In to Continue Learning</h1>

        {/* Subtitle (exact lines from figma) */}
        <p className="text-center text-gray-300 text-sm mb-6 leading-5">
          Learn anytime, anywhere. <br />
          Access your classes instantly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email / Phone */}
          <div>
            <input
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              type="text"
              placeholder="Email"
              className="w-full bg-[#181818] border border-[#2b2b2b] rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2f2f2f]"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full bg-[#181818] border border-[#2b2b2b] rounded-lg px-4 py-3 pr-12 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2f2f2f]"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Checkbox row */}
          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="w-3 h-3 bg-transparent border border-gray-500 rounded-sm"
                disabled={loading}
              />
              <span className="ml-1 text-gray-300">Remember Me</span>
            </label>

            <button type="button" className="text-sm text-gray-300 hover:underline">
              Need help?
            </button>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#B11C20] hover:bg-[#991219] rounded-lg py-3 mt-1 text-white font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* New to LMS text (exact) */}
        <p className="text-center text-gray-300 mt-6">
          New to LMS?{" "}
          <a href="/signup" className="text-white font-semibold hover:underline">
            Sign up now.
          </a>
        </p>

        {/* Footer small text (exact from Figma) */}
        <p className="text-center text-xs text-gray-500 mt-6 leading-5">
          Looking for world-class learning? Start your Journey with experienced - designed courses and masterclasses.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
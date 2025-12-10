import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const savePassword = async () => {
    if (!password) return alert("Please enter password");

    setSaving(true);

    const newEntry = { email, password, createdAt: new Date().toISOString() };

    // Try to update the dummy JSON file (will fail on static hosts).
    try {
      const res = await fetch("/Letter/passwords.json");
      if (!res.ok) throw new Error("Could not read dummy file");

      const data = await res.json();

      data.push(newEntry);

      // Attempt to write back (note: this usually won't work on static hosts)
      const writeRes = await fetch("/Letter/passwords.json", {
        method: "PUT", // your server would need to accept this and update the file
        body: JSON.stringify(data, null, 2),
        headers: { "Content-Type": "application/json" },
      });

      if (!writeRes.ok) throw new Error("Server refused write");

      // success path
      alert("Password saved to dummy file ✅");
    } catch (err) {
      // Fallback: save to localStorage (demo-only)
      try {
        const existing = JSON.parse(localStorage.getItem("demo_passwords") || "[]");
        existing.push(newEntry);
        localStorage.setItem("demo_passwords", JSON.stringify(existing, null, 2));
        alert(
          "Could not save to /Letter/passwords.json — saved locally in localStorage for demo "
        );
      } catch (lsErr) {
        alert("Failed to save password: " + (lsErr.message || err.message));
        setSaving(false);
        return;
      }
    }

    setSaving(false);

    // Navigate to plan chooser and pass email in state (or use query param)
    navigate("/planchooser", { state: { email } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <header className="w-full h-20 border-b border-gray-500 px-4 md:px-12 flex justify-between items-center py-4">
        {/* logo: smaller on mobile, original size on md+ */}
        <img src="/logoBlack.png" alt="Logo" className="h-20 w-20 md:h-40 md:w-40 object-contain" />
        
        <button on onClick={() => navigate("/app/signin")}
         className="cursor-pointer">
        <p className="font-medium underline text-sm md:text-base">Sign in</p>
        </button>
      </header>

      {/* heading area: keep same look but responsive spacing */}
      <div className="mt-18 md:mt-16 w-full px-4 md:px-0 max-w-[820px]">
        <div className="mx-auto" style={{ maxWidth: "580px" }}>
          <p className="text-gray-900 text-left text-sm">Step <span className="font-bold">1</span> of <span className="font-bold">3</span></p>
          <h1 className="text-2xl  text-left md:text-3xl font-bold mt-3 text-black">
            Create a Password to Begin your Subscription
          </h1>
          <p className="text-gray-600 text-left mt-3 text-sm">
            You are just a few more steps away from accessing
            <br className="hidden md:block" />
            all LMS features!
          </p>
        </div>
      </div>

      {/* form area - same visual size on desktop, fluid on mobile */}
      <div className="w-full px-4 md:px-0 mt-6 md:mt-12">
        <div className="mx-auto w-full max-w-[580px] space-y-5">
          {/* Disabled Email Box */}
          <div className="border border-green-600 text-left rounded-md p-1">
            <label className="text-green-600 ml-1 text-xs">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full  bg-transparent outline-none text-black font-medium"
            />
          </div>

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3.5 placeholder:text-gray-400 outline-none text-black font-medium"
          />

          {/* Next Button */}
          <button
            onClick={savePassword}
            disabled={saving}
            className={`w-full bg-red-700 text-white py-4 rounded-lg font-semibold shadow-md transition ${
              saving ? "opacity-60 cursor-not-allowed" : "hover:bg-red-800"
            }`}
          >
            {saving ? "Saving..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

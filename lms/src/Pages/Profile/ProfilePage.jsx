import Sidebar from "./ProfileSidebar";
import { useRef, useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import userGrey from "../../assets/user-grey.png";
import Header from "../Header/Header";
import { useAuth } from "../../context/AuthContext";
import { authAPI } from "../../utils/api";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(userGrey);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setProfile(user.avatarUrl || userGrey);
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" });
      return;
    }

    // For now, we'll use a data URL. In production, upload to cloud storage first
    const url = URL.createObjectURL(file);
    setProfile(url);
    
    // Convert to base64 for now (in production, upload to S3/Cloudinary)
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      await handleSave(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (avatarUrl = null) => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    
    try {
      const response = await authAPI.updateProfile(
        name.trim(),
        phone.trim(),
        avatarUrl || profile !== userGrey ? profile : undefined
      );

      if (response.success) {
        setUser(response.user);
        setMessage({ type: "success", text: "Profile updated successfully!" });
        const timeout = parseInt(import.meta.env.VITE_SUCCESS_MESSAGE_TIMEOUT || "3000", 10);
        setTimeout(() => setMessage({ type: "", text: "" }), timeout);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  const handleNameBlur = () => {
    if (name.trim() !== user?.name) {
      handleSave();
    }
  };

  const handlePhoneBlur = () => {
    if (phone.trim() !== user?.phone) {
      handleSave();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40">
        <Header />
      </div>

      <div className="flex bg-[#141414] pt-16 text-white min-h-screen">
        <div className="mt-0 px-0 md:mt-8 md:px-12">
          <Sidebar />
        </div>

        {/* Center Column */}
        <div className="flex-1 flex flex-col items-cente px-4 pt-8">
          {/* Title */}
          <h1 className="text-4xl font-light font-serif text-left mb-8 ">
            Profile
          </h1>

          {/* PROFILE IMAGE */}
          <div className="relative mb-14 flex flex-col items-center lg:w-3xl">
            <img
              src={profile}
              alt="User"
              className="w-32 h-32 rounded-full bg-[#d9d9d9] object-contain p-2 shadow-md"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 ml-18 bg-black p-1.5 rounded-full border border-white/25 hover:scale-110 transition"
            >
              <Pencil size={14} />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* MESSAGE */}
          {message.text && (
            <div className={`w-full max-w-[650px] px-4 ml-0 lg:ml-16 mb-4 ${
              message.type === "success" ? "text-green-400" : "text-red-400"
            }`}>
              {message.text}
            </div>
          )}

          {/* FORM SECTION */}
          <div className="w-full max-w-[650px] flex flex-col px-4  gap-6 ml-0 lg:ml-16">
            {/* NAME */}
            <input
              className="block w-full bg-transparent text-lg py-2 border-b border-white/20 outline-none text-white/60 focus:text-white focus:border-white/40 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="Name"
              disabled={saving}
            />

            {/* EMAIL */}
            <input
              className="block w-full bg-transparent text-lg py-2 border-b border-white/20 outline-none text-white/60 cursor-not-allowed"
              value={email}
              disabled
              placeholder="Email"
            />

            {/* PHONE */}
            <input
              className="block w-full bg-transparent text-lg py-2 border-b border-white/20 outline-none text-white/60 focus:text-white focus:border-white/40 transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder="Phone"
              disabled={saving}
            />
          </div>
        </div>
      </div>
    </>
  );
}

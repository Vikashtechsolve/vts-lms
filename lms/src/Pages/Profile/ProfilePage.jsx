import Sidebar from "./ProfileSidebar";
import { useRef, useState } from "react";
import { Pencil } from "lucide-react";
import userGrey from "../../assets/user-grey.png";

export default function ProfilePage() {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(userGrey);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile(url);
  };

  return (
    <div className="flex bg-[#141414] text-white min-h-screen">
      <div className="mt-8 px-12 ">
        <Sidebar />
      </div>

      {/* Center Column */}
      <div className="flex-1 flex flex-col items-cente px-4 pt-8">
        {/* Title */}
        <h1 className="text-4xl font-light font-serif text-left mb-8 ">
          Profile
        </h1>

        {/* PROFILE IMAGE */}
        <div className="relative mb-14 flex flex-col left-78">
          <img
            src={profile}
            alt="User"
            className="w-32 h-32 rounded-full bg-[#d9d9d9] object-contain p-2 shadow-md"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 left-22 bg-black p-1.5 rounded-full border border-white/25 hover:scale-110 transition"
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

        {/* FORM SECTION */}
        <div className="w-full max-w-[650px] flex flex-col gap-6 ml-16">
          {/* NAME */}
          <input
            className="w-full bg-transparent text-lg py-2 border-b border-white/20 outline-none text-white/60"
            defaultValue="Rohan Singh"
          />

          {/* EMAIL */}
          <input
            className="w-full bg-transparent text-lg py-2 border-b border-white/20 outline-none  text-white/60"
            defaultValue="rohansingh2209@gmail.com"
          />

          {/* PHONE */}
          <input
            className="w-full bg-transparent text-lg py-2 border-b border-white/20 outline-none text-white/60"
            defaultValue="+91 9823478093"
          />
        </div>
      </div>
    </div>
  );
}

import Sidebar from "./ProfileSidebar.jsx";
import { Layers, CheckCircle2, Lock, Star } from "lucide-react";

const ProfileSubscription = () => {
  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 p-10 pt-24 text-left">

        {/* Top Heading */}
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>

        {/* Subscription title with icon */}
        <div className="flex items-center gap-2 mb-6 mt-6">
          <Layers size={20} className="text-yellow-500" />
          <span className="text-lg font-semibold">Subscription</span>
        </div>

        {/* Current Plan Banner */}
        <div className="bg-[#141414] border border-zinc-800 rounded-xl px-6 py-4 w-[550px] mb-6">
          <p className="text-[15px] font-medium">
            <span className="text-gray-300">Your Current Plan : </span>
            <span className="text-white">Starter Plan</span>
          </p>
          <p className="text-[14px] text-gray-400 mt-1">
            You're on the free plan with limited access
          </p>
        </div>

        {/* Main Plan Card */}
        <div className="bg-[#141414] border border-zinc-800 rounded-xl px-6 py-6 w-[550px] ">
          <p className="text-[15px] font-medium mb-2">
            <span className="text-gray-300">Plan name : </span>
            <span className="text-white">Starter Plan</span>
          </p>
          <p className="text-[15px] font-medium mb-5">
            <span className="text-gray-300">Status : </span>
            <span className="text-green-500">Active</span>
          </p>

          {/* Two Row Sections */}
          <div className="flex justify-between gap-10">
            
            {/* Left: Included Features */}
            <div>
              <p className="font-medium mb-3">Features Included :</p>
              <ul className="space-y-2 text-[15px]">
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Website Overview</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Access to all playlist cards</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Masterclass cards visible</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Blogs cards visible</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> News cards visible</li>
              </ul>
            </div>

            {/* Right: Locked Features */}
            <div>
              <p className="font-medium mb-3">Locked Features :</p>
              <ul className="space-y-2 text-[15px]">
                <li className="flex items-center gap-2"><Lock size={18} className="text-yellow-500" /> Playlist details (Notes, Videos, PPT, Test)</li>
                <li className="flex items-center gap-2"><Lock size={18} className="text-yellow-500" /> Doubt Session Access</li>
                <li className="flex items-center gap-2"><Lock size={18} className="text-yellow-500" /> Mentor Connect</li>
                <li className="flex items-center gap-2"><Lock size={18} className="text-yellow-500" /> Live Master Classes Access</li>
              </ul>
            </div>
          </div>

          {/* View Plan Details */}
          <p className="text-right mt-4 text-sm text-blue-400 underline cursor-pointer">
            View all plan details
          </p>
        </div>

        {/* Upgrade Button */}
        <button className="bg-red-600 hover:bg-red-700 transition mt-7 px-6 py-3 rounded-lg text-[16px] font-semibold flex items-center justify-center gap-2 w-[550px]">
          <Star size={18} /> Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default ProfileSubscription;

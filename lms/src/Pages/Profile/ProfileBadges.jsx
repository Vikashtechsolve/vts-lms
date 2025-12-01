import ProfileSidebar from "./ProfileSidebar";
import { Award } from "lucide-react";

const ProfileBadges = () => {
  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">
      
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Section */}
     
        <div className="flex-1 p-10 pt-24 text-left">
        
        
        {/* Profile Heading */}
    <h1 className="text-2xl font-semibold mb-2">Profile</h1>

        {/* Badge Title Row */}
        <div className="flex items-center gap-2 mb-6 mt-6">
          <Award size={20} className="text-yellow-500" />
          <span className="text-lg font-semibold">Badges</span>
        </div>

        {/* Badge Empty Box */}
        <div className="bg-[#141414] border border-zinc-800 rounded-xl w-[550px] h-[260px] flex flex-col items-center justify-center text-center px-6">
          <p className="text-gray-300 text-[16px] font-medium mb-2">No Badges Earned Yet</p>
          <p className="text-gray-400 text-sm">
            Start learning and complete activities to earn badges{" "}
            <span className="text-blue-400 underline cursor-pointer">here.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBadges;

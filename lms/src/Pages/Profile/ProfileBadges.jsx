import { Award } from "lucide-react";
import ProfileSidebar from "./ProfileSidebar";

const ProfileBadges = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#0B0B0B] text-white min-h-screen">
      
      {/* Sidebar (full width on mobile, regular on desktop) */}
      <div className="w-full md:w-auto">
        <ProfileSidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 px-5 sm:px-8 md:px-10 py-8">

        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold mb-8 md:mb-10 text-left">
          Profile
        </h1>

        {/* Title */}
        <div className="flex items-center gap-2 mb-8">
          <Award className="text-white w-5 h-5" />
          <h1 className="text-xl sm:text-2xl font-semibold">Badges</h1>
        </div>

        {/* Card */}
        <div className="
          bg-[#161616]
          border border-[#242424]
          rounded-xl
          p-6 sm:p-10
          flex flex-col items-center justify-center
          text-center
          min-h-[250px] sm:min-h-[300px]
          w-full md:w-1/2
          mx-auto
        ">
          <p className="text-lg font-medium mb-3">No Badges Earned Yet</p>

          <p className="text-sm font-medium text-[#E0E0E0] leading-6 max-w-[420px]">
            Start learning and complete activities to earn badges.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProfileBadges;

import ProfileSidebar from "./ProfileSidebar";
import { Plus } from "lucide-react";

const Watchlist = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#0B0B0B] text-white min-h-screen">
      
      {/* Sidebar (full width on mobile, fixed on desktop) */}
      <div className="w-full md:w-auto">
        <ProfileSidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 px-5 sm:px-8 md:px-10 py-8 md:py-10">
        
        <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold mb-8 md:mb-10 text-left">
          Profile
        </h1>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <Plus size={18} className="bg-[#232323] p-1 rounded" />
          <h1 className="text-xl sm:text-2xl font-semibold text-left">Watchlist</h1>
        </div>

        {/* Empty Watchlist Box */}
        <div className="
          bg-[#161616] 
          border border-[#242424] 
          rounded-xl 
          p-6 sm:p-10 
          flex flex-col items-center justify-center 
          text-center 
          min-h-[260px] sm:min-h-[300px] 
          w-full md:w-1/2 mx-auto
        ">
          <p className="text-lg font-medium mb-3">Your Watchlist Is Empty</p>

          <p className="text-sm text-[#C6C6C6] leading-6 max-w-[520px] mb-5">
            Looks like you haven’t added anything to your watchlist yet.  
            Save videos, courses, and masterclasses here to continue watching  
            anytime — all in one place!
          </p>

          <p className="text-sm font-medium text-[#E0E0E0]">
            Start exploring and add your first item!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;

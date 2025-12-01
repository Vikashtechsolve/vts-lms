import Sidebar from "./ProfileSidebar";

const ProfileWatchlist = () => {
  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
        <div className="flex-1 p-10 pt-24 text-left">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>

        {/* Tab Title */}
        <div className="flex items-center gap-2 text-gray-300 mb-6">
          <span className="text-[17px] font-medium">➕</span>
          <span className="text-[16px]">Watchlist</span>
        </div>

        {/* Grey Card */}
        <div className="bg-[#1A1A1A] rounded-xl w-[480px] h-[260px] flex flex-col justify-center items-center px-6 text-center text-gray-300">
          <p className="font-semibold text-[15px] mb-2">Your Watchlist Is Empty</p>
          <p className="text-[13px] leading-5">
            Looks like you haven’t added anything to your watchlist yet.
            <br />
            Save videos, courses, and masterclasses here to continue watching
            anytime — all in one place!
          </p>

          <p className="text-[13px] mt-4 font-semibold text-gray-400">
            Start exploring and add your first item!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileWatchlist;

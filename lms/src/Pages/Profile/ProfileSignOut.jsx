import Sidebar from "./ProfileSidebar";

const ProfileSignOut = () => {
  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
        <div className="flex-1 p-10 pt-24 text-left">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>

        {/* Tab Title */}
        <div className="flex items-center gap-2 text-gray-300 mb-10">
          <span className="text-[18px]">↩️</span>
          <span className="text-[16px]">Sign Out</span>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center text-gray-300 mt-10">
          <h3 className="text-[18px] font-semibold mb-2">
            Are You Sure You Want to Sign Out?
          </h3>

          <p className="text-[14px] mb-8">
            You'll be logged out of your LMS account and will need to sign in again to continue learning.
          </p>

          {/* Buttons */}
          <button className="bg-[#202020] w-[350px] py-3 rounded-md text-[15px] font-medium mb-3 hover:bg-[#2a2a2a] transition">
            Yes
          </button>

          <button className="bg-[#202020] w-[350px] py-3 rounded-md text-[15px] font-medium hover:bg-[#2a2a2a] transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSignOut;

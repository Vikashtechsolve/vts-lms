import Sidebar from "./ProfileSidebar.jsx";


const ProfileCertificates = () => {
  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Side Content */}
        <div className="flex-1 p-10 pt-24 text-left">
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>

        

        {/* Tab / Title checkbox like Figma */}
        <div className="flex gap-2 text-gray-400 mb-6">
          <input type="checkbox" checked readOnly />
          <span className="text-[15px]">Certificates</span>
        </div>

        {/* Grey card */}
        <div className="bg-[#1A1A1A] rounded-xl w-[420px] h-[260px] flex flex-col justify-center items-center text-gray-400">
          <p className="text-[16px]">No Certificates Yet</p>
          <p className="text-sm mt-2 text-center px-4">
            Complete courses to earn your certificates
            <span className="text-blue-400 underline cursor-pointer ml-1">
              here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCertificates;

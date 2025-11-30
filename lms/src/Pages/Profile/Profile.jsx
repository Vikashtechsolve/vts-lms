import ProfileSidebar from "./ProfileSidebar";
import ProfileSection from "./ProfileSection";

const Profile = () => {
  return (
    <div className="flex bg-black min-h-screen">
      <div className="w-[22%]">
        <ProfileSidebar />
      </div>
      <div className="w-[78%]">
        <ProfileSection />  
      </div>
    </div>
  );
};

export default Profile;


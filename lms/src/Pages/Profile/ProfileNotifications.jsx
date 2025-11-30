import Sidebar from "./ProfileSidebar.jsx";
import { Bell } from "lucide-react";

const notificationsData = [
  {
    id: 1,
    title: "New Masterclass Available",
    desc: "A new masterclass on DSA Mastery has been added to your playlist. Start learning now!",
  },
  {
    id: 2,
    title: "Test Result Updated",
    desc: "Your test results for Machine Learning Basics – Quiz 1 are now available. View score and correct answers.",
  },
  {
    id: 3,
    title: "Upcoming Live Session Reminder",
    desc: "Your live session Cracking Technical Interviews starts tomorrow at 7:00 PM. Don’t forget to join!",
  },
  {
    id: 4,
    title: "New Notes Uploaded",
    desc: "Fresh study notes and PPTs have been uploaded for your playlist JavaScript Fundamentals.",
  },
  {
    id: 5,
    title: "Certificate Earned",
    desc: "Congratulations! You’ve successfully earned a certificate for completing Python for Beginners.",
  },
];

const ProfileNotifications = () => {
  return (
    <div className="flex bg-[#0B0B0B] text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      
        <div className="flex-1 p-10 pt-24 text-left">
        
        {/* Profile Heading */}
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>

        {/* Title with icon */}
        <div className="flex items-center gap-2 mb-8 mt-6">
          <Bell size={20} className="text-yellow-500" />
          <span className="text-lg font-semibold">Notifications</span>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col gap-3 w-[600px]">
          {notificationsData.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1A1A] border border-zinc-800 rounded-lg px-5 py-4 text-gray-300 text-[14px] hover:bg-[#222222] transition cursor-pointer"
            >
              <p className="font-medium text-[15px] mb-1">
                {item.id}. {item.title}
              </p>
              <p className="text-gray-400 leading-[20px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileNotifications;

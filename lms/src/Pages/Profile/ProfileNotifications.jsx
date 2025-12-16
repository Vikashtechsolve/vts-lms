import Header from "../Header/Header";
import Sidebar from "./ProfileSidebar";
import { Bell } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New Masterclass Available ",
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
    <>
      <div className="fixed top-0 left-0 w-full z-40">
        <Header />
      </div>

      <div className="flex flex-col mt-16 md:flex-row bg-[#141414] text-white min-h-screen">
        {/* Sidebar (full width on mobile) */}
        <div className="mt-0 px-0 md:mt-8 md:px-12">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 px-5 sm:px-8 md:px-10 py-8 md:py-10">
          <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-semibold mb-6 text-left">
            Profile
          </h1>

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Bell size={22} />
            <h1 className="text-xl sm:text-2xl font-semibold text-left">
              Notifications
            </h1>
          </div>

          {/* Notification Cards */}
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="
                bg-[#161616] 
                rounded-lg 
                border border-[#262626] 
                p-4 sm:p-5 
                hover:border-[#3A3A3A] 
                transition 
                cursor-pointer 
                w-full md:w-3/4
              "
              >
                <p className="font-medium text-[#C6C6C6] mb-1 text-left">
                  {item.id}. {item.title}
                </p>
                <p className="text-sm text-[#C6C6C6] text-left">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNotifications;

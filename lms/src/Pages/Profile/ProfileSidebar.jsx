import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  FileBadge,
  Award,
  BadgeCheck,
  Bell,
  PlusCircle,
  LogOut,
  ArrowLeft
} from "lucide-react";

export default function ProfileSidebar() {
  const navigate = useNavigate();

  const sidebarMenu = [
    { id: 1, label: "Profile", icon: <User size={18} />, route: "/profile" },
    { id: 2, label: "Certificates", icon: <FileBadge size={18} />, route: "/certificates" },
    { id: 3, label: "Badges Earned", icon: <Award size={18} />, route: "/badges" },
    { id: 4, label: "Subscription", icon: <BadgeCheck size={18} />, route: "/subscription" },
    { id: 5, label: "Notifications", icon: <Bell size={18} />, route: "/notifications" },
    { id: 6, label: "Watchlist", icon: <PlusCircle size={18} />, route: "/watchlist" },
    { id: 7, label: "Sign Out", icon: <LogOut size={18} />, route: "/signout" },
  ];

  return (
    <aside className="w-[260px] bg-black border-r border-zinc-800 min-h-screen py-10 px-6">
      
      {/*  Back to VTS button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-300 hover:text-white mt-12 transition"
      >
        <ArrowLeft size={18} /> Back to VTS
      </button>

      {/* Menu Items */}
      <div className="flex flex-col gap-6 mt-10">
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.id}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3 text-[15px] transition ${
                isActive
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

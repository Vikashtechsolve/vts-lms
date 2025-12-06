
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  FileBadge,
  Award,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MENU = [
  { id: 1, title: "Home", to: "/" },
  { id: 2, title: "Playlists", to: "/app/Playlist" },
  { id: 3, title: "Master Classes", to: "/app/MasterClass" },
  { id: 4, title: "Programs", to: "/app/programs" },
  { id: 5, title: "Blogs", to: "//appblogs" },
  { id: 6, title: "News", to: "/app/news" },
  { id: 7, title: "Interviews", to: "//appinterviews" },
  { id: 8, title: "Reels", to: "/app/reels" },
];

// Figma style icons + labels
const userMenu = [
  { id: 1, label: "Profile", icon: <User size={18} /> },
  { id: 2, label: "Certification", icon: <FileBadge size={18} /> },
  { id: 3, label: "Badges", icon: <Award size={18} /> },
  { id: 4, label: "Dashboard", icon: <LayoutDashboard size={18} /> },

  { id: 5, label: "Sign In", icon: <LogOut size={18} />, route: "/signin" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  return (
    <header className="w-full bg-[#0F0F0F] h-20 flex items-center px-12">
      {/* LOGO */}
      <div className="flex items-center">
        <img src="/logo.png" className="w-35" />
      </div>

      {/* CENTER MENU */}
      <nav className="hidden md:flex items-center gap-10 mx-auto">
        {MENU.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `text-white text-[15px] font-medium hover:text-red-500 transition ${
                isActive ? "text-red-500" : ""
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* SEARCH ICON */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="text-white text-xl hover:text-red-500 transition"
        >
          <Search size={22} />
        </button>

        {/* SEARCH BAR */}
        {showSearch && (
          <div
            className="flex items-center bg-[#1A1A1A] border border-gray-700
          rounded-full px-4 py-2 w-64 transition"
          >
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent text-white ml-3 w-full focus:outline-none"
            />

            <button
              onClick={() => setShowSearch(false)}
              className="text-gray-400 hover:text-red-500 ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition text-white"
          >
            <User size={20} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-[#111111] text-white rounded-xl shadow-xl z-50 py-2">
              {userMenu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.route) navigate(item.route);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3  transition text-left"
                >
                  {item.icon}
                  <span className="text-[15px]">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

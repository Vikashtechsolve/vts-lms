import { NavLink } from "react-router-dom";
import { Search, User } from "lucide-react";
import { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MENU = [
  { id: 1, title: "Home", to: "/" },
  { id: 2, title: "Playlists", to: "/Playlist" },
  { id: 3, title: "Master Classes", to: "/MasterClass" },
  { id: 4, title: "Programs", to: "/Programs" },
  { id: 5, title: "Blogs", to: "/Blogs" },
  { id: 6, title: "News", to: "/News" },
  { id: 7, title: "Interviews", to: "/interviews" },
  { id: 8, title: "Reels", to: "/Reels" },
];

const DROPDOWN = [
  { id: "profile", label: "Profile", to: "/profile" },
  { id: "cert", label: "Certification", to: "/certification" },
  { id: "badges", label: "Badges", to: "/badges" },
  { id: "dash", label: "Dashboard", to: "/dashboard" },
  
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

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

        {/* SEARCH ICON (opens search bar) */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="text-white text-xl hover:text-red-500 transition"
        >
          <Search size={22} />
        </button>

        {/* SEARCH BAR (shows on icon click) */}
        {showSearch && (
          <div className="flex items-center bg-[#1A1A1A] border border-gray-700 
          rounded-full px-4 py-2 w-64 transition">
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
            <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                Profile
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                Certification
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                Badges
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                Dashboard
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

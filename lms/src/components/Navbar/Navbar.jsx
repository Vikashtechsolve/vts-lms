import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, ChevronDown, Search } from "lucide-react";
import useOnClickOutside from "../../hooks/useOnClickOutside";



const MENU = [
  { id: 1, title: "Home", to: "/" },
  { id: 2, title: "Playlists", to: "/Playlist" },
  { id: 3, title: "Master Classes", to: "/master-classes" },
  { id: 4, title: "Programs", to: "/programs" },
  { id: 5, title: "Blogs", to: "/blogs" },
  { id: 6, title: "News", to: "/news" },
  { id: 7, title: "Interviews", to: "/interviews" },
  { id: 8, title: "Reels", to: "/reels" },
];

const DROPDOWN = [
  { id: "profile", label: "Profile", to: "/profile" },
  { id: "cert", label: "Certification", to: "/certification" },
  { id: "badges", label: "Badges", to: "/badges" },
  { id: "dash", label: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  // close panels on outside click or Escape
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));
  useOnClickOutside(mobileRef, () => setMenuOpen(false));
  useOnClickOutside(searchRef, () => setSearchOpen(false));

 

  const handleDropdownSelect = (to) => {
    setDropdownOpen(false);
    navigate(to);
  };

  return (
    <nav className="bg-[#1f1f1f] text-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" aria-label="Home">
              <img src="/logo.png" alt="VTS Logo" className="h-8 w-auto" />
            </NavLink>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {MENU.map((link) => (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm transition duration-200 ${isActive ? "text-white font-medium" : "text-gray-300 hover:text-white"}`
                }
                end
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                aria-expanded={searchOpen}
                aria-label="Open search"
                className="p-2 rounded-md hover:bg-white/5 transition"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div
                  className="absolute right-0 top-12 w-72 bg-white/5 backdrop-blur-sm rounded-md shadow-lg p-2 z-50"
                  role="dialog"
                  aria-label="Site search"
                >
                  <label htmlFor="nav-search" className="sr-only">
                    Search
                  </label>
                  <input
                    id="nav-search"
                    type="search"
                    placeholder="Search playlists, courses..."
                    className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm outline-none placeholder-gray-300"
                    // add onChange handler / debounce for real search
                  />
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((d) => !d)}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                className="flex items-center bg-[#a42424] p-2 rounded-full text-white hover:bg-[#8e1f1f] transition"
                title="Account"
              >
                <User className="w-5 h-5" />
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-20"
                  role="menu"
                  aria-label="Account menu"
                >
                  {DROPDOWN.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleDropdownSelect(item.to)}
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div ref={mobileRef} className="md:hidden">
              <button
                onClick={() => setMenuOpen((m) => !m)}
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                className="p-2 rounded-md focus:outline-none"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`${menuOpen ? "block" : "hidden"} md:hidden bg-[#1f1f1f] border-t border-gray-700`}>
        <div className="px-4 py-3 space-y-1">
          {MENU.map((link) => (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`
              }
              onClick={() => setMenuOpen(false)}
              end
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

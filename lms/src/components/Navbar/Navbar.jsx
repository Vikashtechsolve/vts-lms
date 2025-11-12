import React, { useState } from "react";
import { NavbarMenu } from "../Data/data";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#121212] text-white w-full py-4 px-10 flex items-center justify-between shadow-md relative">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png"
          alt="VTS Logo"
          className="h-8 w-auto"
        />
        <span className="text-xl font-semibold tracking-wide">VTS</span>
      </div>

      {/* Center: Menu Links */}
      <ul className="hidden md:flex items-center space-x-8">
        {NavbarMenu.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer text-gray-300 hover:text-white transition"
          >
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>

      {/* Right: Search + Profile */}
      <div className="flex items-center space-x-5 relative">
        <CiSearch
          size={22}
          className="cursor-pointer hover:text-gray-300 transition"
        />

        {/* Profile Dropdown */}
        <div
          className="flex items-center space-x-1 bg-[#1E1E1E] px-3 py-2 rounded-full cursor-pointer hover:bg-[#2A2A2A] transition relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiUser size={20} />
          <IoMdArrowDropdown
            size={18}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 bg-[#1E1E1E] rounded-lg shadow-lg w-40 py-2 z-50"
              >
                <ul className="flex flex-col text-gray-300">
                  <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">Profile</li>
                  <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">Settings</li>
                  <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">Logout</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

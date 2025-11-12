import React, { useState } from "react";
import { NavbarMenu } from "../Data/data";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#121212] text-white w-full py-4 px-6 md:px-10 flex items-center justify-between shadow-md relative">
      {/*  Logo */}
      <div className="flex items-center space-x-2 z-50">
        <img src="/logo.png" alt="VTS Logo" className="h-12 w-auto" />

        {/* <span className="text-xl font-semibold tracking-wide">VTS</span> */}
      </div>

      {/* Center: Menu Links (Desktop Only) */}
      <ul className="hidden md:flex items-center space-x-8">
        {NavbarMenu.map((item) => (
          <li
            key={item.id}
            className="cursor-pointer text-gray-300 hover:text-white transition"
          >
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>

      {/* Right: Search + Profile + Mobile Menu Button */}
      <div className="flex items-center space-x-5 z-50">
        {/* Search Icon */}
        <CiSearch
          size={22}
          className="cursor-pointer hover:text-gray-300 transition"
        />

        {/* Profile Dropdown (Desktop Only) */}
        <div
          className="hidden md:flex items-center space-x-1 bg-[#1E1E1E] px-3 py-2 rounded-full cursor-pointer hover:bg-[#2A2A2A] transition relative"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <CiUser size={20} />
          <IoMdArrowDropdown
            size={18}
            className={`transition-transform duration-300 ${
              isProfileOpen ? "rotate-180" : ""
            }`}
          />

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-12 bg-[#1E1E1E] rounded-lg shadow-lg w-40 py-2 z-50"
              >
                <ul className="flex flex-col text-gray-300">
                  <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">
                    Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Menu (Animated) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-[#1A1A1A] flex flex-col items-start px-6 py-4 md:hidden border-t border-gray-800"
          >
            {NavbarMenu.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="w-full text-gray-300 py-2 border-b border-gray-700 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {/* Profile Dropdown in Mobile Menu */}
            <div className="mt-4 w-full">
              <div
                className="flex items-center space-x-2 bg-[#1E1E1E] px-3 py-2 rounded-md cursor-pointer hover:bg-[#2A2A2A] transition"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <CiUser size={20} />
                <span>Account</span>
                <IoMdArrowDropdown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2 bg-[#1E1E1E] rounded-md"
                  >
                    <ul className="flex flex-col text-gray-300">
                      <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">
                        Settings
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer">
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


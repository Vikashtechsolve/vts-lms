import React from "react";
import Sidebar from "./ProfileSidebar";

import {
  BookOpenCheck,
  ListMusic,
  GraduationCap,
  Award,
  CheckCircle,
  Layers,
} from "lucide-react";
import Header from "../Header/Header";

export default function StudentProgress() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40">
        <Header />
      </div>

      <div className="flex bg-[#141414] pt-16 min-h-screen text-left">
        {/* Sidebar */}
        <div className="mt-0 px-0 md:mt-8 md:px-12">
          <Sidebar />
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 text-white px-6 py-8">
          {/* <h1 className="text-[40px] font-semibold mb-10 text-left">Profile</h1> */}

          {/* Profile Heading */}
          <h1 className="text-[34px] font-semibold mb-6">Profile</h1>

          {/* Student Progress Heading */}
          <div className="flex items-center gap-3 mb-1">
            <GraduationCap size={22} className="text-gray-200" />
            <h1 className="text-[22px] font-semibold">Student Progress</h1>
          </div>
          <p className="text-gray-400 text-[14px] mb-8">
            Track your course completion, quiz performance, and overall learning
            milestones
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ALL COURSES PROGRESS */}
            <div className="bg-[#141414] p-5 rounded-xl shadow border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <BookOpenCheck className="text-gray-300" size={22} />
                <h2 className="text-[17px] font-medium">
                  All Courses Progress
                </h2>
              </div>

              <p className="text-gray-300 text-[14px] mb-2">
                Your Progress Bar : 92%
              </p>

              <div className="w-full bg-gray-700 h-3 rounded-full">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>

              <p className="text-gray-400 text-[13px] mt-3">
                You have completed almost 90% of your Enrolled Courses
              </p>
            </div>

            {/* PLAYLIST */}
            <div className="bg-[#141414] p-5 rounded-xl shadow border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <ListMusic className="text-gray-300" size={22} />
                <h2 className="text-[17px] font-medium">Playlist</h2>
              </div>

              <h1 className="text-[22px] font-semibold mb-1">
                12 Modules Completed
              </h1>
              <p className="text-gray-400 text-[13px]">
                12 Modules Classes Completed
              </p>
            </div>

            {/* MASTER CLASSES */}
            <div className="bg-[#141414] p-5 rounded-xl shadow border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-gray-300" size={22} />
                <h2 className="text-[17px] font-medium">
                  Master Classes Attended
                </h2>
              </div>

              <h1 className="text-[22px] font-semibold mb-1">
                5 Master Classes Done
              </h1>
              <p className="text-gray-400 text-[13px]">
                Last Master Class : 3 Days ago
              </p>
            </div>
          </div>

          {/* SECOND ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* QUIZZES */}
            <div className="bg-[#141414] p-5 rounded-xl shadow border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-gray-300" size={22} />
                <h2 className="text-[17px] font-medium">
                  Total Quizzes Attempt
                </h2>
              </div>

              <h1 className="text-[22px] font-semibold mb-1">
                12 Quizzes Attempted
              </h1>
              <p className="text-gray-400 text-[13px]">
                Last Quiz : 3 Days ago
              </p>
            </div>

            {/* BADGES */}
            <div className="bg-[#141414] p-5 rounded-xl shadow border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-gray-300" size={22} />
                <h2 className="text-[17px] font-medium">Badges Earned</h2>
              </div>

              <h1 className="text-[22px] font-semibold mb-1">
                8 Badges Earned
              </h1>
              <p className="text-[13px] text-gray-300 cursor-pointer hover:underline">
                View all Badges
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

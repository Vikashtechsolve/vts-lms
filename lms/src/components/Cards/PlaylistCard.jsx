// src/components/Cards/PlaylistCard.jsx
import React from "react";
import { Play, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // navigate to detail page
    navigate(`/app/playlist/${item.id}`);
  };

  const handleAddClick = (e) => {
    // prevent card click while interacting with add button
    e.stopPropagation();
    // TODO: handle add-to-playlist logic here
    console.log("Add clicked for", item.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-[70%] sm:w-[45%] md:w-70 flex-shrink-0 cursor-pointer"
    >
      <div
        className="group relative rounded-2xl transition-all duration-500 transform-gpu hover:scale-125 hover:z-50"
        style={{ overflow: "visible" }}
      >
        {/* NORMAL CARD */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* BADGES */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {item.duration || "1h 45m"}
        </div>
        <div className="absolute bottom-3 left-3 bg-white/30 backdrop-blur-md p-2 rounded-full">
          <Play size={18} fill="white" />
        </div>

        {/* TITLE */}
        <p className="text-white mt-3 font-semibold text-sm px-1">
          {item.title}
        </p>

        {/* EXPANDED ON HOVER */}
        <div
          className="
        absolute inset-0 rounded-xl
        bg-black/70 backdrop-blur-xl
        opacity-0 group-hover:opacity-100 
        transition-all duration-300
        h-72 z-50 flex flex-col
        p-3
      "
        >
          {/* TOP HALF - IMAGE */}
          <div className="h-40 rounded-xl overflow-hidden mb-">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* BOTTOM HALF CONTENT */}
          <div className="flex flex-col gap-3 text-white">
            {/* BUTTONS */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/app/playlist/${item.id}/watch`);
                }}
                className="bg-white text-black font-semibold px-5 py-2 rounded-md flex items-center gap-2 text-sm w-full cursor-pointer"
              >
                <Play size={18} fill="black" /> Watch Now
              </button>

              <button onClick={handleAddClick} className="p-2 text-white">
                <SquarePlus size={40} fill="grey" />
              </button>
            </div>

            {/* YEAR + MODULES */}
            <div className="flex justify-between text-sm font-medium">
              <span>{item.year || "2025"}</span>
              <span>{item.modules || "6 Modules"}</span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 text-xs text-left leading-relaxed">
              {item.description ||
                "Create stunning web apps with React. Learn components, hooks, APIs, and deployment with real-world projects."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;

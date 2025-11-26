// src/components/Cards/PlaylistCard.jsx
import React from "react";
import { Play, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // navigate to detail page
    navigate(`/playlist/${item.id}`);
  };

  const handleAddClick = (e) => {
    // prevent card click while interacting with add button
    e.stopPropagation();
    // TODO: handle add-to-playlist logic here
    console.log("Add clicked for", item.id);
  };

  return (
    <div
      // key should be provided by parent when mapping: <PlaylistCard key={item.id} item={item} />
      onClick={handleCardClick}
      className=" relative w-80 flex-shrink-0 relative cursor-pointer"
      aria-label={`Open playlist ${item.title}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick();
      }}
      style={{ outline: "none" }}
    >
      <div
        className="group relative rounded-2xl transition-all duration-500 transform-gpu hover:scale-125 hover:z-50"
        style={{ overflow: "visible", perspective: 1000 }}
      >
        {/* IMAGE WRAPPER */}
        <div className="rounded-2xl overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* BADGES */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {item.duration || "1h 45m"}
        </div>

        <div className="absolute bottom-3 left-3 bg-white/30 backdrop-blur-md p-2 rounded-full">
          <Play size={18} fill="white" className="text-white" />
        </div>

        {/* TITLE */}
        <p className="text-white mt-3 font-semibold text-sm px-1">{item.title}</p>

        {/* HOVER OVERLAY */}
        <div
          className="
            absolute inset-0 rounded-2xl bg-grey-700 backdrop-blur-xl opacity-0 group-hover:opacity-100 rounded-2x transition-all duration-00 p-3 flex flex-col justify-center  h-72 z-50 "
         
        >
          {/* IMAGE TOP ON HOVER */}
          <div className="h-40 overflow-hidden rounded-xl mb-3 pointer-events-auto">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to watch or play route
                navigate(`/playlist/${item.id}/watch`);
              }}
              className="bg-white text-black font-semibold px-6 py-2 w-72 rounded-xl flex items-center gap-2 text-sm"
            >
              <Play size={18} fill="black" /> Watch Now
            </button>

            <button
              onClick={handleAddClick}
              className="p-2 text-white"
              aria-label={`Add ${item.title}`}
              type="button"
            >
              <SquarePlus size={40} fill="grey" />
            </button>
          </div>

          {/* DETAILS */}
          <div className="mt-4 text-gray-300 text-sm pointer-events-auto">
            <div className="flex justify-between text-white font-medium">
              <span>{item.year || "2025"}</span>
              <span>{item.modules || "6 Modules"}</span>
            </div>

            <p className="mt-2 text-gray-300 text-xs leading-relaxed">
              {item.description ||
                "This playlist covers modern development with hands-on projects & tutorials"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;

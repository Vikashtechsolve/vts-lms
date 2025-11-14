// src/components/Playlist.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircleChevronLeft  , CircleChevronRight, Play, } from "lucide-react";

function Playlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Local JSON path in public folder
    const url = "/dummy.json";


    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load playlist data:", err);
        setItems([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollContainer = (direction) => {
    const container = document.getElementById("playlist-scroll");
    if (!container) return;
    const amt = 320;
    if (direction === "left") container.scrollLeft -= amt;
    else container.scrollLeft += amt;
  };

  if (loading) {
    return (
      <div className="bg-black text-white py-8 px-6">
        <div className="text-sm text-gray-400">Loading playlists...</div>
      </div>
    );
  }

  return (
  <div className="bg-black text-white py-8 px-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Playlists</h2>
      <button className="text-sm text-gray-400 hover:text-white transition">
        View All &rarr;
      </button>
    </div>

    <div className="relative">
      <div
        id="playlist-scroll"
        className="flex space-x-4 overflow-x-auto scroll-smooth px-1 py-2"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", 
          msOverflowStyle: "none", 
        }}
      >
        <style>
          {`
            #playlist-scroll::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-2xl w-72 flex-shrink-0 overflow-hidden shadow-lg hover:scale-105 transform transition-transform duration-200"
          >
            <div className="relative">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 p-2 rounded-full">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs">
                {Math.floor(Math.random() * 2) + 1}h {Math.floor(Math.random() * 50)}m
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold truncate">{item.title}</h3>
              <p className="text-xs text-gray-400 mt-1 truncate">
                {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ⬇️ Scroll buttons below cards, centered */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => scrollContainer("left")}
          aria-label="scroll left"
          className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition"
        >
          <CircleChevronLeft  className="w-10 h-10" />
        </button>
        <button
          onClick={() => scrollContainer("right")}
          aria-label="scroll right"
          className="bg-black/60 hover:bg-black text-white p-2 rounded-full shadow transition"
        >
          <CircleChevronRight  className="w-10 h-10" />
        </button>
      </div>
    </div>
  </div>
);

}

export default Playlist;

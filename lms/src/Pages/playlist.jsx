// src/components/Playlist.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

function Playlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const url = "/playlist.json";

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.playlists)
          ? res.data.playlists
          : [];
        setItems(data);
      } catch (err) {
        console.error("Failed to load playlists:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-10">
            Playlists
          </h1>
          <div className="text-sm text-gray-400">Loading playlists...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-white min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold text-center mb-10">Playlists</h1>
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {items.map((item) => {
            const duration =
              item.duration ??
              `${Math.floor(Math.random() * 2) + 0}h ${
                Math.floor(Math.random() * 50) + 10
              }m`;
            return (
              <div key={item.id ?? item.title} className="flex flex-col gap-3">
                <Link to={`/playlist/${item.id}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-lg bg-zinc-800 h-44 cursor-pointer">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-purple-700 to-violet-500" />
                    )}

                    <div className="absolute left-3 bottom-3 flex items-center gap-2 text-white text-xs">
                      <div className="w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                        <Play className="w-4 h-4" />
                      </div>
                      <span className="text-xs">{duration}</span>
                    </div>

                    {item.free && (
                      <div className="absolute right-3 top-3 bg-white/10 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-xs">
                        Free
                      </div>
                    )}
                  </div>
                </Link>

                <div className="px-1">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  {item.category && (
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {item.category}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

       
        <div className="mt-12" />
      </div>
    </div>
  );
}

export default Playlist;

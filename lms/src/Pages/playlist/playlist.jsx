// src/components/Playlist.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PlaylistCard from "../../components/Cards/PlaylistCard";

function Playlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const url = "/dummy.json"; // Update with actual API endpoint

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
      <div className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            Playlists
          </h1>
          <div className="text-sm sm:text-base text-gray-400 text-center">
            Loading playlists...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif mb-6 sm:mb-8">
            Playlists
          </h1>

          {/* Grid: remains responsive; keeps original design */}
          <div
            ref={containerRef}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2"
          >
            {items.map((item) => (
              <div key={item.id} className="w-full">
                {/* ensure each card fills its grid cell */}
                <PlaylistCard item={item} />
              </div>
            ))}
          </div>

          <div className="mt-12" />
        </div>
      </div>
    </div>
  );
}

export default Playlist;

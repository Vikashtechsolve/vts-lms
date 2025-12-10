// src/components/Playlist.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PlaylistCard from "../../components/Cards/PlaylistCard";

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
    <div className="px-6 py-10 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className=" items-center justify-between mb-8">
          <h1 className="text-3xl m-8 font-serif">Playlists</h1>

          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {items.map((item) => (
              <PlaylistCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12" />
        </div>
      </div>
    </div>
  );
}

export default Playlist;

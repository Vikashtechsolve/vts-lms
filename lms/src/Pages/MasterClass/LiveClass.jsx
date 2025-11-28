// src/Pages/MasterClass/LiveClass.jsx
import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";

const LiveClass = () => {
  const { id } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item ?? null);
  const [loading, setLoading] = useState(!item);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) return; 
    setLoading(true);
    fetch("/masterClass.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load masterClass.json");
        return r.json();
      })
      .then((data) => {
        const numericId = Number(id);
        const found = data.find((c) => c.id === numericId);
        if (!found) throw new Error("Class not found");
        setItem(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, item]);

  if (loading) return <div className="p-8 text-zinc-300">Loading...</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;
  if (!item) return <div className="p-8 text-zinc-300">No class found.</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img src={item.thumbnail} alt={item.title} className="w-full h-96 object-cover" />

          <div className="absolute left-0 right-0 bottom-0 flex justify-center">
            <div className="w-full max-w-3xl mx-auto bg-black/60 backdrop-blur-sm text-center py-3 rounded-t">
              <div className="inline-flex items-center gap-3 text-sm font-semibold text-white">
                <span className="w-3 h-3 bg-red-500 rounded-full block" />
                <span>{item.badge || item.status || "Live Class"}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/70 flex items-center justify-center shadow-lg transform hover:scale-105 transition"
            aria-label="play"
            onClick={() => {
              if (item.joinUrl) window.open(item.joinUrl, "_blank");
            }}
          >
            <Play size={36} className="text-white" />
          </button>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="bg-zinc-800 rounded-lg p-4 shadow">
              <h3 className="text-sm font-semibold mb-2">Live Session Link :</h3>
              <a href={item.joinUrl || "#"} target="_blank" rel="noreferrer" className="block text-xs break-words text-zinc-300">
                {item.joinUrl || "No link available yet"}
              </a>
            </div>

            <div className="mt-6">
              {item.joinUrl ? (
                <a href={item.joinUrl} target="_blank" rel="noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow">
                  Watch Live Class
                </a>
              ) : (
                <div className="inline-block bg-zinc-700 text-zinc-300 px-4 py-2 rounded-full">Registration Open</div>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default LiveClass;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Play, SquarePlus } from "lucide-react";

/**
 * MasterClass component with playlist-like hover effect.
 *
 * - Put your JSON in public/masterClass.json (or adjust URL)
 * - Thumbnails should point to /images/... or whatever your public path is.
 */

export default function MasterClass() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get("/masterClass.json")
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) setClasses(data);
        else if (Array.isArray(data?.masterClasses)) setClasses(data.masterClasses);
        else {
          const found = Object.values(data).find((v) => Array.isArray(v));
          if (found) setClasses(found);
          else {
            console.error("Unexpected masterClass.json shape:", data);
            setError("Invalid data format in masterClass.json");
          }
        }
      })
      .catch((err) => {
        console.error("Failed to fetch master classes:", err);
        setError("Failed to load classes. Check console/network.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading master classes...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  return (
    <div className="px-6 py-10 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif">Master Classes</h1>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {classes.map((c) => (
            <div key={c.id} className="w-full">
              {/* */}
              <div
                className="relative"
                style={{ overflow: "visible" }}
              >
                {/* card*/}
                <div
                  className="group relative rounded-2xl transition-all duration-500 transform-gpu hover:scale-125 hover:z-50"
                  style={{ overflow: "visible" }}
                >
                  {/* IMAGE WRAPPER */}
                  <div className="rounded-2xl overflow-hidden">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.png";
                      }}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* DURATION BADGE (bottom-right) */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {c.duration || "1h 0m"}
                  </div>

                  {/* PLAY ICON (bottom-left) */}
                  <div className="absolute bottom-3 left-3 bg-white/30 backdrop-blur-md p-2 rounded-full">
                    <Play size={18} className="text-white" />
                  </div>

                  {/* TITLE */}
                  <p className="text-white mt-3 font-semibold text-sm px-1">
                    {c.title}
                  </p>

                  {/* HOVER OVERLAY  */}
                  <div
                    className="
                      absolute inset-0 rounded-2xl bg-black/60
                      opacity-0 group-hover:opacity-100 backdrop-blur-xl
                      transition-all duration-200 p-3
                      flex flex-col justify-center items-start
                      h-72 z-50
                    "
                    style={{ pointerEvents: "none"  }}
                  >
                
                    <div className="w-full h-40 overflow-hidden rounded-xl mb-3">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-1" style={{ pointerEvents: "auto" }}>
                      <button className="bg-white text-black font-semibold px-6 py-2 rounded-xl w-56 flex items-center gap-2 text-sm">
                        <Play size={18} /> Watch Now
                      </button>

                      <button className="bg-white/20 border border-white rounded-full p-2 text-white">
                        <SquarePlus size={20} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="mt-3 text-gray-300 text-sm w-full">
                      <div className="flex justify-between text-white font-medium text-xs">
                        <span>{c.year || "2025"}</span>
                        <span>{c.modules || "6 Modules"}</span>
                      </div>

                      <p className="mt-2 text-gray-300 text-xs leading-relaxed">
                        {c.description || "This master class covers practical topics with hands-on examples."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

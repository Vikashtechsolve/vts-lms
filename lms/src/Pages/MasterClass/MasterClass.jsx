import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MasterClassCard from "../../components/Cards/MasterClassCard";

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
        else if (Array.isArray(data?.masterClasses))
          setClasses(data.masterClasses);
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
          {classes.map((item) => (
            <MasterClassCard item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

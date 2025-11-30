// src/Pages/MasterClass/UpcomingEventClass.jsx
import React, { useEffect, useState } from "react";
import { CalendarCheck2, Play } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";

export default function UpcomingEventClass() {
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
        if (!r.ok) throw new Error("Failed to fetch masterClass.json");
        return r.json();
      })
      .then((data) => {
        const numericId = Number(id);
        const found = data.find((c) => c.id === numericId);
        if (!found) throw new Error("Class not found");
        setItem(found);
      })
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [id, item]);

  if (loading) return <div className="p-8 text-zinc-300">Loading...</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;
  if (!item) return <div className="p-8 text-zinc-300">No event found.</div>;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 px-6 md:px-12 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-md overflow-hidden">
          <img src={item.thumbnail} alt={item.title} className="w-full h-96 object-cover" />

          <div className="absolute left-0 right-0 bottom-0 flex justify-center">
            <div className="w-full max-w-3xl mx-auto bg-black/60 backdrop-blur-sm text-center py-3 rounded-t">
              <div className="inline-flex items-center gap-3 text-sm font-semibold text-white">
                <CalendarCheck2 />
                <span>{item.badge || item.status}</span>
              </div>
            </div>
          </div>

          <button
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/70 flex items-center justify-center shadow-lg transition hover:scale-105"
            
            aria-label="play"
          >
            <Play size={36} className="text-white" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-zinc-800 rounded-md p-4">
            <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
            {item.startAt && (
              <>
                <div  className="text-sm text-zinc-200 mb-2">Date: <span>{new Date(item.startAt).toLocaleDateString()}</span></div>
                <div className="text-sm text-zinc-200 mb-2">Time: <span >{new Date(item.startAt).toLocaleTimeString()}</span></div>
              
              </>
            )}
           
          </div>

        
        </div>
      </div>
    </div>
  );
}
// src/components/PlaylistDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Share2, MessageSquare, Edit2, Calendar } from "lucide-react";

export default function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get("/PlaylistDetails.json");
        const data = Array.isArray(res.data)
          ? res.data.find((p) => String(p.id) === String(id))
          : res.data.playlists?.find((p) => String(p.id) === String(id));
        setPlaylist(data ?? null);
      } catch (err) {
        console.error("Error loading playlist:", err);
        setPlaylist(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center">
        <div className="text-gray-400">Loading playlist...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-[#070707] text-white flex items-center justify-center">
        <div className="text-red-400">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 gap-6">

        <aside className="col-span-3 hidden md:block">
         
          <div className="bg-[#111111] rounded-md p-4 h-full text-sm">
            <h4 className="text-red-500 font-semibold mb-4">DSA Mastery</h4>
            <nav className="space-y-2 text-gray-300">
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span>Module 1</span>
                <span className="text-gray-500">▾</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span>Module 2</span>
                <span className="text-gray-500">▾</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span>Module 3</span>
                <span className="text-gray-500">▾</span>
              </div>
              <div className="py-2 text-gray-500">Module 4</div>
              <div className="py-2 text-gray-500">Module 5</div>
              <div className="py-2 text-gray-500">Module 6</div>
            </nav>
          </div>
        </aside>

        {/*MAIN*/}
        <main className="col-span-12 md:col-span-9">
          {/* Info Card  */}
          <div className="bg-[#121212] border border-[#232323] rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                {/* Pills / tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Videos", "Notes", "PPT", "Test"].map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-3 py-1 rounded-full border ${
                        t === "Videos" ? "bg-[#9b1b1b] text-white border-transparent" : "border-gray-800 text-gray-200"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h1 className="text-lg md:text-2xl font-semibold mb-2">{playlist.title}</h1>
                <p className="text-sm text-gray-300 leading-relaxed">{playlist.description}</p>

                <p className="text-xs text-gray-500 mt-4">Released on: {playlist.released}</p>
              </div>

              {/* action icons (right side) */}
              <div className="flex items-center gap-3 text-gray-400">
                <button title="Share" className="p-2 rounded hover:text-white">
                  <Share2 size={16} />
                </button>
                <button title="Comments" className="p-2 rounded hover:text-white">
                  <MessageSquare size={16} />
                </button>
                <button title="Edit" className="p-2 rounded hover:text-white">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Video Card  */}
          <div className="bg-transparent rounded-xl p-0">
            <div className="bg-[#151516] border border-[#232323] rounded-xl overflow-hidden shadow-inner">
              <div className="px-5 py-4 border-b border-[#232323]">
                <div className="text-sm text-gray-200 font-medium">{playlist.title} | Module 1 | Session 2</div>
              </div>

              {/* iframe responsive container */}
              <div className="w-full" style={{ background: "#0f0f10" }}>
                <div className="relative" style={{ paddingTop: "35%"  }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={playlist.videoUrl}
                    title={playlist.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* bottom spacing */}
          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}

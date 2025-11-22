// src/components/PlaylistDetail.jsx
import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Share2, MessageSquare, Edit2, ChevronDown, ChevronRight, Video } from "lucide-react";

// Lazy load heavy tabs
const Videos = React.lazy(() => import("./playlistDetailsTabs/Videos"));
const PPT = React.lazy(() => import("./playlistDetailsTabs/PPT"));

// Eager load lightweight tabs
import Notes from "./playlistDetailsTabs/Notes";
import Test from "./playlistDetailsTabs/Test";

export default function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Videos");

  // Sidebar Accordion State
  const [openModule, setOpenModule] = useState(null);

  const tabs = ["Videos", "Notes", "PPT", "Test"];

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get("/PlaylistDetails.json");
        const data = Array.isArray(res.data)
          ? res.data.find((p) => String(p.id) === String(id))
          : res.data.playlists?.find((p) => String(p.id) === String(id));
        setPlaylist(data ?? null);
      } catch (err) {
        console.error(err);
        setPlaylist(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );

  if (!playlist)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Playlist not found
      </div>
    );

  // Dummy module/session data
  const modules = [
    {
      name: "Module 1 – Basics",
      sessions: ["Session 1: Introduction", "Session 2: Getting Started", "Session 3: Fundamentals"],
    },
    {
      name: "Module 2 – Intermediate",
      sessions: ["Session 1: Core Concepts", "Session 2: Deep Dive"],
    },
    {
      name: "Module 3 – Advanced",
      sessions: ["Session 1: Architecture", "Session 2: Optimization", "Session 3: Case Studies"],
    },
  ];

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-12 gap-6">
        
        {/* ===================== SIDEBAR ===================== */}
        <aside className="col-span-3 hidden md:block">
          <div className="bg-[#111111] rounded-md p-4 h-full text-sm border border-[#1f1f1f]">

            <h2 className="text-gray-200 font-semibold mb-4 text-lg">
              Course Content
            </h2>

            <div className="space-y-3">
              {modules.map((module, index) => {
                const isOpen = openModule === index;

                return (
                  <div key={index} className="bg-[#0f0f0f] rounded-lg border border-[#1e1e1e]">
                    {/* Module Header */}
                    <button
                      onClick={() =>
                        setOpenModule(isOpen ? null : index)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-left text-gray-300 hover:bg-[#1a1a1a] rounded-lg"
                    >
                      <span className="font-medium">{module.name}</span>
                      {isOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>

                    {/* Sessions List */}
                    {isOpen && (
                      <ul className="px-4 pb-3 pt-1 space-y-1 text-gray-400">
                        {module.sessions.map((s, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 px-2 py-1 hover:bg-[#1a1a1a] rounded-md cursor-pointer"
                          >
                            <Video size={14} className="text-gray-500" />
                            <span className="text-xs">{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
        {/* ===================== END SIDEBAR ===================== */}


        {/* ===================== MAIN CONTENT ===================== */}
        <main className="col-span-12 md:col-span-9">
          <div className="bg-[#121212] border border-[#232323] rounded-xl p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tabs.map((t) => {
                    const isActive = t === activeTab;
                    return (
                      <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`text-xs px-3 py-1 rounded-full border transition ${
                          isActive
                            ? "bg-[#9b1b1b] text-white border-transparent"
                            : "border-gray-800 text-gray-200 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <h1 className="text-lg md:text-2xl font-semibold mb-2">
                  {playlist.title}
                </h1>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {playlist.description}
                </p>
                <p className="text-xs text-gray-500 mt-4">
                  Released on: {playlist.released}
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <button className="p-2 hover:text-white">
                  <Share2 size={16} />
                </button>
                <button className="p-2 hover:text-white">
                  <MessageSquare size={16} />
                </button>
                <button className="p-2 hover:text-white">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#151516] border border-[#232323] rounded-xl overflow-hidden shadow-inner">
            <div className="px-5 py-4 border-b border-[#232323]">
              <div className="text-sm text-gray-200 font-medium">
                {playlist.title} | Module 1 | Session 2
              </div>
            </div>

            <div className="p-6">
              {activeTab === "Videos" && (
                <Suspense fallback={<div className="text-center text-gray-400">Loading video...</div>}>
                  <Videos videoUrl={playlist.videoUrl} />
                </Suspense>
              )}

              {activeTab === "Notes" && <Notes notes={playlist.notes} />}

              {activeTab === "PPT" && (
                <Suspense fallback={<div className="text-center text-gray-400">Loading presentation...</div>}>
                  <PPT pptUrl={playlist.pptUrl} />
                </Suspense>
              )}

              {activeTab === "Test" && <Test test={playlist.test} />}
            </div>
          </div>

          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}

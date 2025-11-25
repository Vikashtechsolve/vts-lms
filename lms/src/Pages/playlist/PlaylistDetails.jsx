// src/components/PlaylistDetail.jsx
import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Share2, MessageSquare, Edit2, Video as VideoIcon } from "lucide-react";

import Sidebar from "./playlistDetailsTabs/SideBar/SideBar";
import { courseData } from "../../../courseData";

const Videos = React.lazy(() => import("./playlistDetailsTabs/Videos/Videos"));
const PPT = React.lazy(() => import("./playlistDetailsTabs/PPT/PPT"));

import Notes from "./playlistDetailsTabs/Notes/Notes";
import Test from "./playlistDetailsTabs/Test/Test";

export default function PlaylistDetail() {
  const { id } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Videos");
  const [activeSessionKey, setActiveSessionKey] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  const tabs = ["Videos", "Notes", "PPT", "Test"];

  // Fetch playlist 
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get("/PlaylistDetails.json");
        const data = Array.isArray(res.data)
          ? res.data.find((p) => String(p.id) === String(id))
          : res.data.playlists?.find((p) => String(p.id) === String(id)) || res.data;
        setPlaylist(data ?? null);
        console.log("Loaded playlist:", data);
      } catch (err) {
        console.error("Failed to fetch playlist:", err);
        setPlaylist(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  const modules = (courseData?.modules && courseData.modules.length)
    ? courseData.modules
    : playlist?.modules ?? [];

  
  useEffect(() => {
    if (currentSession) return;

    // Prefer first session from courseData/modules if present
    if (modules && modules.length) {
      const first = modules[0]?.sessions?.[0] ?? null;
      if (first) {
        setCurrentSession(first);
        return;
      }
    }

   
    if (playlist) {
      const possibleSession = (playlist.sessions && playlist.sessions[0]) || null;
      if (possibleSession) {
        setCurrentSession(possibleSession);
      }
    }
  }, [modules, playlist, currentSession]);

  
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

  
  const videoData = {
    title: currentSession?.video?.title ?? playlist.title ?? "Video",
    description: currentSession?.video?.description ?? playlist.description ?? "",
    url: currentSession?.video?.url ?? playlist.videoUrl ?? playlist.video ?? "",
  };

  const notesData = currentSession?.notes ?? playlist.Notes ?? playlist.notes ?? playlist.notesData ?? null;
  const pptUrl = currentSession?.ppt ?? playlist.pptUrl ?? playlist.ppt ?? null;
  const testData = currentSession?.test ?? playlist.test ?? playlist.tests ?? null;

 
  const handleSelectSession = (sessionKey) => {
    if (!sessionKey) return;
    setActiveSessionKey(sessionKey);

    // Parse module and session titles from the emitted sessionKey
    const firstDash = sessionKey.indexOf("-");
    let moduleTitle, sessionTitle;
    if (firstDash === -1) {
      const parts = sessionKey.split("-");
      moduleTitle = parts[0];
      sessionTitle = parts.slice(1).join("-");
    } else {
      moduleTitle = sessionKey.slice(0, firstDash);
      sessionTitle = sessionKey.slice(firstDash + 1);
    }

    // Find module
    const mod = modules.find((m) => String(m.title) === String(moduleTitle)) ||
                modules.find((m) => String(m.title).includes(String(moduleTitle)) || String(moduleTitle).includes(String(m.title)));

    if (!mod) {
      console.warn("handleSelectSession: module not found for key:", sessionKey);
      return;
    }

    const session = (mod.sessions || []).find((s) => String(s.title) === String(sessionTitle));
    if (!session) {
      console.warn("handleSelectSession: session not found in module:", moduleTitle, "sessionTitle:", sessionTitle);
      return;
    }

    setCurrentSession(session);
    setActiveTab("Videos");
  };

  return (
    <div className="bg-[#0b0b0c] text-white min-h-screen py-4">
      <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-12 gap-6 ">
        {/* SIDEBAR */}
        <div className="col-span-3 bg-zinc-90">
          <Sidebar modules={modules} activeSessionKey={activeSessionKey} onSelectSession={handleSelectSession} />
        </div>

        {/* MAIN */}
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
                          isActive ? "bg-[#9b1b1b] text-white border-transparent" : "border-gray-800 text-gray-200 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <h1 className="text-lg md:text-2xl font-semibold mb-2">{playlist.title ?? courseData?.courseTitle}</h1>
                <p className="text-sm text-gray-300 leading-relaxed">{playlist.description}</p>
                <p className="text-xs text-gray-500 mt-4">Released on: {playlist.released}</p>
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
                {playlist.title ?? courseData?.courseTitle} {currentSession ? `| ${currentSession.title}` : ""}
              </div>
            </div>

            <div className="p-6">
              {activeTab === "Videos" && (
                <Suspense fallback={<div className="text-center text-gray-400">Loading video...</div>}>
                  <Videos data={videoData} />
                </Suspense>
              )}

              {activeTab === "Notes" && <Notes data={notesData} />}

              {activeTab === "PPT" && (
                <Suspense fallback={<div className="text-center text-gray-400">Loading presentation...</div>}>
                  <PPT pptUrl={pptUrl} />
                </Suspense>
              )}

              {activeTab === "Test" && <Test test={testData} />}
            </div>
          </div>

          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}

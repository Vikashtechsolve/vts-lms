import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

export default function RecordedClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [masterClass, setMasterClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/masterClass.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load masterClass.json");
        return r.json();
      })
      .then((data) => {
        const numericId = Number(id);
        const item = data.find((c) => c.id === numericId) ?? data[0];
        setMasterClass(item);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-zinc-300">Loading...</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;
  if (!masterClass)
    return <div className="p-8 text-zinc-300">No class found.</div>;

  const {
    thumbnail,
    title,
    badge,
    notes,
    whatThisSessionCovers = [],
    keyTakeaways = [],
    whyMatters = "",
    description,
    instructor,
    duration,
    status,
    joinUrl,
    recordingUrl,
  } = masterClass;

  return (
    <div className=" bg-zinc-900 text-zinc-200 px-6 md:px-12 py-2">
      {/* Hero / video area */}
      <div className=" rounded-md overflow-hidden">
        <div className="relative  bg-black">
          <img
            src={thumbnail}
            alt={title}
            className="w-full  md:h-96 object-cover block"
          />

          {/* Play overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/60 flex items-center justify-center cursor-pointer"
              onClick={() => {
                // if we have a recordingUrl, open in new tab; otherwise if joinUrl open that
                if (recordingUrl) window.open(recordingUrl, "_blank");
                else if (joinUrl) window.open(joinUrl, "_blank");
              }}
            >
              <Play className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Notes button */}
      <div className="mt-4">
        <button
          className="border bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-md text-xl w-22 h-12 shadow flex justify-center items-center"
          onClick={() => {
            const notesSection = document.getElementById("notes-section");
            if (notesSection)
              notesSection.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Notes
        </button>
      </div>

      {/* Content columns */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* left content */}
        <div className="md:col-span-8 text-left">
          <div className="mb-4">
            <h2 className="mt-2 font-bold text-2xl text-zinc-100">{title}</h2>
            <p className="text-sm text-zinc-400 mt-1">
              {description} • Instructor:{" "}
              <span className="text-zinc-200 font-medium">{instructor}</span>
            </p>
          </div>

          {/* Notes / description */}
          <div id="notes-section" className="mb-8">
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
              Topic : <span className="font-normal text-zinc-300">{notes}</span>
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {whyMatters ||
                "This masterclass is designed to prepare you for real-world technical interviews with complete clarity and confidence."}
            </p>
          </div>

          {/* What this session covers */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-zinc-100 mb-2">
              What This Session Covers:
            </h4>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {whatThisSessionCovers.length > 0 ? (
                whatThisSessionCovers.map((t, i) => <li key={i}>{t}</li>)
              ) : (
                <li>Content will be updated soon.</li>
              )}
            </ul>
          </div>

          {/* Key takeaways */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-zinc-100 mb-2">
              Key Takeaways:
            </h4>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {keyTakeaways.length > 0 ? (
                keyTakeaways.map((t, i) => <li key={i}>{t}</li>)
              ) : (
                <li>Key takeaways will be shared post-session.</li>
              )}
            </ul>
          </div>

          {/* Why this matters */}
          <div className="mb-12">
            <h4 className="text-sm font-semibold text-zinc-100 mb-2">
              Why This Masterclass Matters:
            </h4>
            <p className="text-sm text-zinc-400">
              {whyMatters ||
                "This session equips you with the tools needed to perform successfully and stand out from other candidates."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

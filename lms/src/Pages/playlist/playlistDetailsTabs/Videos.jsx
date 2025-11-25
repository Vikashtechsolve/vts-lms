// src/components/tabs/Videos.jsx
import React from "react";

export default function Videos({ videoUrl }) {
  if (!videoUrl) return <div className="text-gray-400">No video available.</div>;

  return (
    <div className="w-full" style={{ background: "#0f0f10" }}>
      <div className="relative" style={{ paddingTop: "35%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={videoUrl}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

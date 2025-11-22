// src/components/tabs/PPT.jsx
import React from "react";

export default function PPT({ pptUrl }) {
  if (!pptUrl) return <div className="text-gray-400">No PPT available.</div>;

  // If it's a Google Slides embed or PDF link, iframe should work.
  return (
    <div>
      <iframe
        className="w-full h-[520px] rounded-md border border-gray-800"
        src={pptUrl}
        title="Presentation"
      />
    </div>
  );
}

// src/components/tabs/Notes.jsx
import React from "react";
import parse from "html-react-parser";

export default function Notes({ notes }) {
  // notes can be HTML string or plain text
  if (!notes) return <div className="text-gray-400">No notes available.</div>;

  // If notes is plain text with newlines:
  if (typeof notes === "string" && !notes.trim().startsWith("<")) {
    return <div className="whitespace-pre-wrap text-sm text-gray-200">{notes}</div>;
  }

  // If notes is HTML string:
  try {
    return <div className="prose max-w-none text-gray-200">{parse(notes)}</div>;
  } catch (e) {
    // fallback to plain text
    return <div className="whitespace-pre-wrap text-sm text-gray-200">{notes}</div>;
  }
}

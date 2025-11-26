// src/components/playlistDetailsTabs/Notes/Notes.jsx
import React from "react";
import { FaRegCopy, FaRegLightbulb } from "react-icons/fa";

// --- Reusable CodeBlock ---
const CodeBlock = ({ code }) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden my-6">
      <div className="flex justify-between items-center bg-gray-700 px-4 py-2">
        <span className="text-gray-300 text-sm">Example Code</span>
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-white">
            <FaRegLightbulb size={16} />
          </button>
          <button
            className="text-gray-400 hover:text-white flex items-center"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            <FaRegCopy size={16} />
            <span className="ml-2 text-sm">Copy</span>
          </button>
        </div>
      </div>
      <pre className="p-4 text-sm text-left text-gray-200 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// --- Helper to render different content blocks ---
const ContentBlock = ({ block }) => {
  if (!block) return null;
  switch (block.type) {
    case "p":
      return <p className="text-left mb-4">{block.text}</p>;
    case "h4":
      return <h4 className="font-semibold text-left text-white mb-2">{block.text}</h4>;
    case "ul":
      return (
        <ul className="text-left list-disc list-inside space-y-1 mb-4">
          {(block.items || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock code={block.text} />;
    default:
      // fallback: if block is a string or has text property
      if (typeof block === "string") return <p className="mb-4">{block}</p>;
      if (block.text) return <p className=" mb-4">{block.text}</p>;
      return null;
  }
};

// Notes now accepts either `data` or legacy `notes` prop
const Notes = ({ data, notes }) => {
  const d = data ?? notes;

  if (!d) {
    console.warn("Notes: no data provided (expected { topic, content }).");
    return <div className="text-gray-400">No notes available.</div>;
  }

  // Normalize d.content to an array of blocks
  const content = d.content ?? d.blocks ?? (Array.isArray(d) ? d : null);

  if (!content || !Array.isArray(content)) {
    console.warn("Notes: data.content is missing or not an array. Received:", d);
    // If content is a string, render it as a single paragraph
    if (typeof d === "string") {
      return (
        <div className="text-gray-300">
          <h2 className="text-2xl font-bold text-white mb-1">{d.title ?? "Notes"}</h2>
          <p className="text-sm text-gray-400 mb-2">{d}</p>
        </div>
      );
    }
    return <div className="text-gray-400">No notes available.</div>;
  }

  return (
    <div className="text-gray-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{d.topic ?? "Notes"}</h2>
          {d.released && <p className="text-xs text-gray-400">Released on: {d.released}</p>}
        </div>
        <div className="flex space-x-3">{/* icons if needed */}</div>
      </div>

      <p className="text-sm text-gray-400 mb-2">This section is structured and concise study notes...</p>

      <hr className="border-gray-700 my-6" />

      <div>
        {content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>
    </div>
  );
};

export default Notes;

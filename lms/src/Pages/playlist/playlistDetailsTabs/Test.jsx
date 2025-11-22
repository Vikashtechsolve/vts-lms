// src/components/tabs/Test.jsx
import React from "react";

export default function Test({ test }) {
  if (!test) return <div className="text-gray-400">No test available.</div>;

  if (Array.isArray(test)) {
    return (
      <div className="space-y-4">
        {test.map((q, idx) => (
          <div key={idx} className="bg-[#0d0d0e] p-4 rounded border border-gray-800">
            <div className="text-sm font-medium">Q{idx + 1}: {q.question}</div>
            {q.options && (
              <ul className="mt-2 text-sm list-disc list-inside text-gray-300">
                {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }

  return <div className="text-sm text-gray-200">{test.instructions || "Test details available."}</div>;
}

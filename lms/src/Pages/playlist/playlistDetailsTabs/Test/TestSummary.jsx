import React from "react";

// This is the Test Summary page (your first screenshot)
const TestSummary = ({ data, onAttemptNow }) => {
  return (
    <div className="text-gray-300">
      {/* 1. Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Test - {data.title}
          </h2>
          <p className="text-xs text-gray-400">
            Released on: 10 November, 2025
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-2">{data.description}</p>
      <hr className="border-gray-700 my-6" />

      {/* 2. Test Analysis Box */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Test Analysis – {data.title}
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex justify-between">
            <span className="font-medium">Total Questions :</span>
            <span>{data.totalQuestions}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Test Duration :</span>
            <span>{data.duration}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Difficulty Level :</span>
            <span>{data.difficulty}</span>
          </li>
        </ul>

        {/* 3. Attempt Now Button */}
        <div className="mt-8">
          <button
            onClick={onAttemptNow}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Attempt Now
          </button>
        </div>

        {/* 4. Note */}
        <div className="mt-8">
          <h4 className="font-semibold text-white mb-2">Note :</h4>
          <p className="text-sm text-gray-400">{data.note}</p>
        </div>
      </div>
    </div>
  );
};

export default TestSummary;

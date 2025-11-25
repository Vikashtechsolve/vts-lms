import React from "react";

// 1. Accept the new 'onReview' prop
const TestResult = ({ data, answers, onRetake, onReview }) => {
  // --- Calculate Score ---
  let correctCount = 0;
  data.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      correctCount++;
    }
  });

  const total = data.questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  let resultColor = "text-green-500";
  if (percentage < 70) resultColor = "text-yellow-500";
  if (percentage < 40) resultColor = "text-red-500";

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Test Completed!</h2>
      <p className="text-gray-400 text-lg mb-8">
        Here's your analysis for the {data.title}.
      </p>

      <div className={`p-8 bg-gray-900 rounded-lg`}>
        <h3 className="text-lg text-gray-400">Your Score</h3>
        <p className={`text-6xl font-bold my-4 ${resultColor}`}>
          {percentage}%
        </p>
        <p className="text-xl text-white">
          You answered <span className={resultColor}>{correctCount}</span> out
          of {total} questions correctly.
        </p>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onRetake}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Retake Test
        </button>
        <button
          onClick={onReview} // 2. Hook up the 'onReview' function here
          className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-6 rounded-lg"
        >
          Review Answers
        </button>
      </div>
    </div>
  );
};

export default TestResult;

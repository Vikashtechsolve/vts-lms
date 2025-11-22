import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

// --- Reusable Read-Only Option Component ---
// (This component remains the same, no changes needed)
const ReviewOption = ({ option, question, optionIndex, userAnswer }) => {
  const isCorrect = optionIndex === question.correctAnswer;
  const isSelected = optionIndex === userAnswer;
  let borderColor = "border-transparent";
  let icon = null;

  if (isCorrect) {
    borderColor = "border-green-500";
    if (isSelected) icon = <FaCheck className="text-green-500" />;
  } else if (isSelected) {
    borderColor = "border-red-500";
    icon = <FaTimes className="text-red-500" />;
  }

  return (
    <div className={`bg-gray-700 p-4 rounded-lg border-2 ${borderColor}`}>
      <div className="flex justify-between items-start">
        <div className="flex">
          <span className="font-semibold text-gray-400 mr-4">
            {String.fromCharCode(65 + optionIndex)}.
          </span>
          <span className="text-gray-200">{option.text}</span>
        </div>
        {icon}
      </div>
      {(isCorrect || isSelected) && (
        <div className="mt-3 pl-8 text-sm">
          <p className={isCorrect ? "text-green-400" : "text-red-400"}>
            {isCorrect ? "That's Right" : "Not quite"}
          </p>
          <p className="text-gray-400">{option.explanation}</p>
        </div>
      )}
    </div>
  );
};

// --- Main Review Component ---
// 1. Receive 'onBackToResult' and 'onRetake'
const TestReview = ({ data, answers, onRetake, onBackToResult }) => {
  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-white">
          Review Answers – {data.title}
        </h2>

        {/* 2. Add button controls */}
        <div className="flex space-x-4">
          <button
            onClick={onBackToResult} // <-- USE THE CORRECT FUNCTION
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-2 px-4 rounded-lg"
          >
            Back to Result
          </button>
          <button
            onClick={onRetake}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Retake Test
          </button>
        </div>
      </div>

      {/* Map over all questions */}
      <div className="space-y-8">
        {data.questions.map((question, index) => (
          <div key={index}>
            <p className="text-lg text-gray-200 mb-4">
              Ques {index + 1}. {question.text}
            </p>
            <div className="space-y-4">
              {question.options.map((option, optionIndex) => (
                <ReviewOption
                  key={optionIndex}
                  option={option}
                  question={question}
                  optionIndex={optionIndex}
                  userAnswer={answers[index]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestReview;

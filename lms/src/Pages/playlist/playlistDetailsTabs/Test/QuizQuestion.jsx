import React, { useState } from "react";
import { FaChevronDown, FaCheck, FaTimes } from "react-icons/fa";

// --- Reusable Option Component (with instant feedback) ---
const Option = ({
  option,
  question,
  isSelected,
  isAnswered,
  onSelect,
  optionIndex,
}) => {
  const isCorrect = optionIndex === question.correctAnswer;
  let borderColor = "border-transparent"; // Default border
  let icon = null;

  if (isAnswered) {
    if (isCorrect) {
      borderColor = "border-green-500"; // Always show correct answer
      if (isSelected) icon = <FaCheck className="text-green-500" />;
    } else if (isSelected) {
      borderColor = "border-red-500"; // Show user's wrong choice
      icon = <FaTimes className="text-red-500" />;
    }
  }

  return (
    <div
      onClick={onSelect}
      className={`
        bg-gray-700 p-4 rounded-lg border-2 transition-all
        ${
          isAnswered ? "cursor-not-allowed" : "cursor-pointer hover:bg-gray-600"
        }
        ${borderColor}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="flex">
          <span className="font-semibold text-gray-400 mr-4">
            {String.fromCharCode(65 + optionIndex)}.
          </span>
          <span className="text-gray-200">{option.text}</span>
        </div>
        {icon}
      </div>

      {/* Show explanation if this option was selected OR if it's the correct one */}
      {isAnswered && (isCorrect || isSelected) && (
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

// --- Main Quiz Question Component ---
const QuizQuestions = ({ data, onFinishQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);

  const totalQuestions = data.questions.length;
  const question = data.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];
  const isAnswered = selectedAnswer !== undefined;

  const handleSelectAnswer = (optionIndex) => {
    if (isAnswered) return; // Don't allow changing answer
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowHint(false);
    }
  };

  const handleFinish = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length === totalQuestions) {
      onFinishQuiz(answers);
    } else {
      // In a real app, use a modal, not an alert
      alert("Please answer all questions before finishing.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-300 mb-6">
        Test - {data.title}
      </h2>
      <div className="flex">
        {/* Question Nav */}
        <div className="hidden sm:flex flex-col space-y-4 pr-8 border-r border-gray-700">
          {data.questions.map((_, index) => (
            <span
              key={index}
              className={`text-lg cursor-pointer ${
                index === currentQuestion
                  ? "text-white font-bold"
                  : answers[index] !== undefined
                  ? "text-green-500" // Show answered questions
                  : "text-gray-500 hover:text-gray-300"
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </span>
          ))}
        </div>

        {/* Question Content */}
        <div className="pl-0 sm:pl-8 flex-1">
          <p className="text-lg text-gray-200 mb-6">
            Ques {currentQuestion + 1}. {question.text}
          </p>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Option
                key={index}
                option={option}
                question={question}
                optionIndex={index}
                isSelected={selectedAnswer === index}
                isAnswered={isAnswered}
                onSelect={() => handleSelectAnswer(index)}
              />
            ))}
          </div>

          {/* Hint */}
          <div className="mt-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-gray-400 hover:text-white flex items-center"
            >
              Show hint{" "}
              <FaChevronDown
                className={`ml-2 transition-transform ${
                  showHint ? "rotate-180" : ""
                }`}
                size={12}
              />
            </button>
            {showHint && (
              <div className="bg-gray-700 p-4 rounded-lg mt-3 text-gray-300">
                {question.hint}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-6 rounded-md disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestion === totalQuestions - 1 ? (
              <button
                onClick={handleFinish}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md"
              >
                Finish
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAnswered} // User must answer to proceed
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-6 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;

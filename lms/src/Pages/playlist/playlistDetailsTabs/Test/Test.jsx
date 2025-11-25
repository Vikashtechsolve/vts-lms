// src/components/playlistDetailsTabs/Test/Test.jsx
import React, { useState } from "react";
import TestSummary from "./TestSummary";
import QuizQuestions from "./QuizQuestion";
import TestResult from "./TestResult";
import TestReview from "./TestReview";

const Test = ({ test }) => {
  // ------------------------
  // ❗ ALL HOOKS AT TOP
  // ------------------------
  const [page, setPage] = useState("summary"); 
  const [answers, setAnswers] = useState({});

  // ❗ If NO test data → return AFTER all hooks
  if (!test) {
    return <div className="text-gray-400">No quiz data available.</div>;
  }

  // ------------------------
  // Handlers
  // ------------------------
  const startQuiz = () => {
    setAnswers({});
    setPage("questions");
  };

  const finishQuiz = (finalAnswers) => {
    setAnswers(finalAnswers);
    setPage("result");
  };

  const handleReview = () => {
    setPage("review");
  };

  const handleBackToResult = () => {
    setPage("result");
  };

  const retakeQuiz = () => {
    setAnswers({});
    setPage("summary");
  };

  // ------------------------
  // CLEAN PAGE SWITCHER (SAFE)
  // ------------------------
  switch (page) {
    case "summary":
      return <TestSummary data={test} onAttemptNow={startQuiz} />;

    case "questions":
      return <QuizQuestions data={test} onFinishQuiz={finishQuiz} />;

    case "result":
      return (
        <TestResult
          data={test}
          answers={answers}
          onRetake={retakeQuiz}
          onReview={handleReview}
        />
      );

    case "review":
      return (
        <TestReview
          data={test}
          answers={answers}
          onRetake={retakeQuiz}
          onBackToResult={handleBackToResult}
        />
      );

    default:
      return <div className="text-red-400">Invalid test state</div>;
  }
};

export default Test;

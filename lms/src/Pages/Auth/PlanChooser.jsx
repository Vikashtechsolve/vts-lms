import React, { useState } from "react";
import StarterPlan from "../../components/Cards/StarterPlan";
import MonthlyPlan from "../../components/Cards/MonthlyPlan";
import YearlyPlan from "../../components/Cards/YearlyPlan";
import { useNavigate } from "react-router-dom";

/**
 * PlanChooser
 * Composes the three plan cards and provides Next button
 * Usage: <PlanChooser onNext={(planId) => ...} />
 */
export default function PlanChooser({ onNext }) {
  const [selected, setSelected] = useState("monthly");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/app')
    if (onNext) onNext(selected);
    // example: navigate to checkout and pass selected plan
    // navigate("/checkout", { state: { planId: selected } });
    // default behaviour: console.log
    console.log("selected plan:", selected);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6 text-left">
          <p className="text-sm text-gray-600">Step 2 of 3</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Choose the Learning Plan that’s right for you</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StarterPlan selected={selected} onSelect={setSelected} />
          <MonthlyPlan selected={selected} onSelect={setSelected} />
          <YearlyPlan selected={selected} onSelect={setSelected} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleNext}
            className="max-w-xl w-full md:w-1/2 bg-red-700 hover:bg-red-800 text-white font-semibold py-4 rounded-md shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

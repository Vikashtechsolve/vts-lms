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
    navigate("/app");
    if (onNext) onNext(selected);
    // example: navigate to checkout and pass selected plan
    // navigate("/checkout", { state: { planId: selected } });
    // default behaviour: console.log
    console.log("selected plan:", selected);
  };

  return (
    <div className="min-h-screen bg-white py-4 ">
      <header className="w-full h-14 border-b border-gray-500 px-4 md:px-12 flex justify-between items-center py-4 ">
       
        <img
          src="/logoBlack.png"
          alt="Logo"
          className=" h-20 w-20 md:h-40 md:w-40 object-contain"
        />

        <button
          onClick={() => navigate("/app/signin")}
          className="cursor-pointer"
        >
          <p className=" font-medium underline text-sm md:text-base">Sign out</p>
        </button>
      </header>

      <div className="max-w-[1200px] mt-8 mx-auto px-6">
        <div className="mb-6 text-left">
          <p className="text-sm text-gray-600">Step 2 of 3</p>
          <h2 className="text-md md:text-3xl font-bold text-gray-900 mt-2">
            Choose the Learning Plan that’s right for you
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StarterPlan selected={selected} onSelect={setSelected} />
          <MonthlyPlan selected={selected} onSelect={setSelected} />
          <YearlyPlan selected={selected} onSelect={setSelected} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleNext}
            className="max-w-xl cursor-pointer w-full md:w-1/2 bg-red-700 hover:bg-red-800 text-white font-semibold py-4 rounded-md shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

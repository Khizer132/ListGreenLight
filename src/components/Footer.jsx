import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { steps } from "../utils/steps.js";
import { useStepNavigation } from "../components/context/StepNavigationContext.jsx";

const Footer = () => {
  const { triggerNext } = useStepNavigation()
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = steps.indexOf(location.pathname);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1]);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-emerald-600 z-50 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
        
        <button
          onClick={goPrevious}

          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold
            ${currentIndex === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed": "bg-emerald-600 text-white"}`}
        >
          ← Previous
        </button>

        <div className="text-xs sm:text-sm text-gray-600 font-medium">
          {currentIndex + 1} / {steps.length}
        </div>

        <button
          onClick={triggerNext}
          disabled={currentIndex === steps.length - 1}
          className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold
            ${currentIndex === steps.length - 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-emerald-600 text-white"}`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { steps, getStepIndex } from "../utils/steps.js";
import { useStepNavigation } from "../components/context/StepNavigationContext.jsx";
import { useState } from "react";


const Footer = () => {
  const { triggerNext } = useStepNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  const [showRestartDialog, setShowRestartDialog] = useState(false);

  const handleConfirmRestart = () => {
    localStorage.removeItem("lg_cannot_go_back")
    setShowRestartDialog(false)
    navigate("/")
  }

  const handleCancelRestart = () => {
    setShowRestartDialog(false)
  }

  const currentIndex = getStepIndex(location.pathname);

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1]
      if (nextStep === "/upload-photos/:token") {
        const token =
          new URLSearchParams(location.search).get("token") ||
          location.pathname.split("/upload-photos/")[1] ||
          location.pathname.split("/analysis/")[1]
        navigate(token ? `/upload-photos/${token}` : nextStep)
      } else if (nextStep === "/analysis/:token") {
        const token = location.pathname.split("/upload-photos/")[1] || location.pathname.split("/analysis/")[1];
        navigate(token ? `/analysis/${token}` : nextStep);
      } else {
        navigate(nextStep)
      }
    }
  };

  const goPrevious = () => {
    const lock = localStorage.getItem("lg_cannot_go_back") === "true"
    const onFinalApproval = location.pathname === "/final-approval"

    // If locked (after reanalysis/final approval), show popup and DON'T navigate back
    if (lock || onFinalApproval) {
      setShowRestartDialog(true)
      return
    }

    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1]
      if (prevStep === "/upload-photos/:token") {
        const token =
          location.pathname.split("/upload-photos/")[1] ||
          location.pathname.split("/analysis/")[1]
        navigate(token ? `/upload-photos/${token}` : "/upload-link-sent")
      } else if (prevStep === "/analysis/:token") {
        const token =
          location.pathname.split("/analysis/")[1] ||
          location.pathname.split("/upload-photos/")[1]
        navigate(token ? `/analysis/${token}` : "/upload-link-sent")
      } else {
        navigate(prevStep)
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-emerald-600 z-50 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">

          <button
            onClick={goPrevious}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold
            ${currentIndex === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-emerald-600 text-white"}`}
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

      {showRestartDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 p-6">
            <h3 className="text-lg font-bold mb-2">Start over required</h3>
            <p className="text-sm text-gray-700 mb-4">
              This action can't be done from this step. You need to start over from the beginning.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelRestart}
                
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRestart}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
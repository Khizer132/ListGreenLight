import React from 'react'
import { BsLightningChargeFill } from "react-icons/bs"
import { steps } from '../utils/steps'
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const currentStep = steps.indexOf(location.pathname) + 1;
    return (
        <div className="bg-white shadow-lg border-b-2 border-emerald-600 sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a className="flex items-center gap-1 sm:gap-2 text-lg sm:text-xl font-bold text-emerald-600">
                    <span>⚡</span>
                    <span>ListGreenLight</span>
                </a>
                <p className="text-xs sm:text-sm text-gray-600">
                    Step {currentStep} of {steps.length}
                </p>
            </div>
        </div>
    )
}

export default Navbar

import React from 'react'
import { FcApproval } from "react-icons/fc";

const Approved = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold  text-center text-emerald-600"><FcApproval className="inline-block mr-2 -mt-1" /> Property Approved</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2 mb-6 sm:mb-8 text-center ">Your property has been approved and is ready for listing</p>
            </div>
        </div>
    )
}

export default Approved

import React from 'react'
import { MdAdjust } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";



const Approval = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Upload Updated Photos</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Show us the property after addressing the checklist</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🍳</div>
                <div className="text-sm sm:text-base font-bold mb-1">Kitchen</div>
                <div className="text-xs sm:text-sm text-gray-500">Click to upload or replace</div>
              </div>
            </label>
          </div>
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🛋️</div>
                <div className="text-sm sm:text-base font-bold mb-1">Living Room</div>
                <div className="text-xs sm:text-sm text-gray-500">Click to upload or replace</div>
              </div>
            </label>
          </div>
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🛏️</div>
                <div className="text-sm sm:text-base font-bold mb-1">Primary Bedroom</div>
                <div className="text-xs sm:text-sm text-gray-500">Click to upload or replace</div>
              </div>
            </label>
          </div>
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🚿</div>
                <div className="text-sm sm:text-base font-bold mb-1">Primary Bathroom</div>
                <div className="text-xs sm:text-sm text-gray-500">Click to upload or replace</div>
              </div>
            </label>
          </div>
        </div>

        <h2 className='font-bold mb-4 text-center text-xl'>Final Approval (Only for Realtor)</h2>

        <div className='flex gap-2 items-center justify-center '>
          <button className="px-12 py-6 bg-emerald-600 text-white  sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"><MdOutlineCheck className='size-6'/>  GreenLight Approval</button>
          <button className="px-12 py-6 bg-yellow-400 text-white sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"><MdAdjust />  Minor Adjusments</button>
          <button className="px-12 py-6 bg-emerald-600 text-white  sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"><MdOutlineCheck className='size-6' />  Good as is</button>
        </div>



      </div>
    </div>
  )
}

export default Approval

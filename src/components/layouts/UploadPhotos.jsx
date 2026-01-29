import React from 'react'
import { LuLightbulb } from "react-icons/lu";
import { useState, useRef } from 'react';

const UploadPhotos = () => {
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
 

  return (
    <div className='max-w-7xl mx-auto px-6 py-8 pb-32'>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className='text-2xl sm:text-3xl font-semibold mb-2'>Upload Property Photos</h2>
        <p className='text-sm sm:text-base text-gray-600 mb-6 sm:mb-8'>123 Maple Street, Omaha, NE 68102</p>

        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 sm:p-4 rounded mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-emerald-900 flex items-center gap-2"><LuLightbulb className='text-red-500' />
            <span className='font-bold'>Tip: </span>
            <span>Take photos from the doorway or corner for the best analysis.</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🍳</div>
                <div className="text-sm sm:text-base font-bold mb-1">Kitchen</div>
                <div className="text-xs sm:text-sm text-gray-500" onClick={() => fileInputRef.current.click()}>Click to upload</div>
              </div>
            </label>
          </div>
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🛋️</div>
                <div className="text-sm sm:text-base font-bold mb-1">Living Room</div>
                <div className="text-xs sm:text-sm text-gray-500" onClick={() => fileInputRef.current.click()}>Click to upload</div>
              </div>
            </label>
          </div>
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🛏️</div>
                <div className="text-sm sm:text-base font-bold mb-1">Primary Bedroom</div>
                <div className="text-xs sm:text-sm text-gray-500" onClick={() => fileInputRef.current.click()}>Click to upload</div>
              </div>
            </label>
          </div>
          <div className='relative'>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center hover:border-emerald-500 cursor-pointer block relative overflow-hidden h-[300px] sm:h-[340px] flex flex-col justify-center" >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🚿</div>
                <div className="text-sm sm:text-base font-bold mb-1">Primary Bathroom</div>
                <div className="text-xs sm:text-sm text-gray-500" onClick={() => fileInputRef.current.click()}>Click to upload</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPhotos

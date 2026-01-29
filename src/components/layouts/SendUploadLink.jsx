import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom"
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useStepNavigation } from "../context/StepNavigationContext.jsx"

const SendUploadLink = () => {
  const navigate = useNavigate();

  const { registerNext } = useStepNavigation();

  const { phoneNo } = useSelector((state) => state.user.user);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const uploadUrl = token
    ? `${window.location.origin}/upload-photos/${token}`
    : "";


  const handleCopy = async () => {
    if (!uploadUrl) return
    try {
      await navigator.clipboard.writeText(uploadUrl)
      toast.success("Upload link copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy upload link")
    }
  }

  const handleLinkNext = () => {
    navigate(`/upload-photos/${token}`);
  }

  useEffect(() => {
    registerNext(handleLinkNext)
  }, [])


  return (
    <div className='max-w-7xl mx-auto px-6 py-8 pb-32'>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center px-4 sm:px-6">

        <div className='size-12 bg-emerald-100 rounded-full flex items-center mx-auto mb-4 sm:mb-6'>
          <IoMdCheckmark className='mx-auto text-emerald-600 size-6' />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Upload Link Sent!</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">We've texted the upload link to {phoneNo}.</p>

        <div className="bg-emerald-50 rounded-lg p-4 sm:p-6">
          <p className='text-xs sm:text-sm font-semibold mb-2 sm:mb-3'>Your Upload Link:</p>
          <div className='flex justify-center gap-2 '>
            <p className="text-sm sm:text-base font-semibold text-emerald-600">{uploadUrl}</p>
            <button className="text-xs sm:text-sm font-semibold size-6 text-emerald-600 hover:text-emerald-700" onClick={handleCopy}><FiCopy /></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SendUploadLink

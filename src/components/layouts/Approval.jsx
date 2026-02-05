import React from 'react'
import { MdAdjust } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSendApprovalEmailMutation } from '../../redux/api/propertyApi';
import toast from 'react-hot-toast';



const Approval = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [sendApprovalEmail, { isLoading }] = useSendApprovalEmailMutation()

  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token")

  const handleFinalApprovalClick = async () => {
    try {
      if (token) {
        await sendApprovalEmail({ token }).unwrap()
      }
    } catch (err) {
      toast.error(err?.data?.message || "Send approval email failed")
    } finally {
      navigate("/approved")
    }
  }

  useEffect(() => {
    localStorage.setItem("lg_cannot_go_back", "true")
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        
        <h2 className='font-bold mb-4 text-center text-xl'>Final Approval (Only for Realtor)</h2>

        <div className='flex gap-2 items-center justify-center '>
          <button className="px-12 py-6 bg-emerald-600 text-white  sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2" onClick={handleFinalApprovalClick} disabled={isLoading}><MdOutlineCheck className='size-6'/>GreenLight Approval</button>
          <button className="px-12 py-6 bg-yellow-400 text-white sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"><MdAdjust />Minor Adjusments</button>
          <button className="px-12 py-6 bg-emerald-600 text-white  sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2" onClick={handleFinalApprovalClick} disabled={isLoading}><MdOutlineCheck className='size-6' />Good as is</button>
        </div>

      </div>
    </div>
  )
}

export default Approval

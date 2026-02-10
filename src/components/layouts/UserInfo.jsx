import React, { useCallback, useEffect } from "react"
import { FiUser } from "react-icons/fi"
import { SlLocationPin } from "react-icons/sl"
import { BsTelephone } from "react-icons/bs"
import { VscMail } from "react-icons/vsc"
import { useCreatePropertyMutation } from "../../redux/api/propertyApi.js"
import { useNavigate } from "react-router-dom"
import { useStepNavigation } from "../context/StepNavigationContext.jsx"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import {
  setUserField,
  setPropertyField,
  setPropertyId,
} from "../../redux/features/userSlice.js"

const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { registerNext } = useStepNavigation()

  const [createProperty, { isLoading }] = useCreatePropertyMutation()

  const { name, email, phoneNo } = useSelector((state) => state.user.user)
  const { address } = useSelector((state) => state.user.property)

  const handleChange = useCallback((e) => {
      const { name: fieldName, value } = e.target

      if (fieldName === "address") {
        dispatch(setPropertyField({ field: "address", value }))
      } else {
        dispatch(setUserField({ field: fieldName, value }))
      }
    },
    [dispatch]
  )

  // Gmail-only validator
  const isGmail = (em) => {
    if (!em) return false
    return /^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(em.trim())
  }

  // US phone validator: accepts 10-digit or 11-digit with leading '1', common formatting
  const isUSPhone = (ph) => {
    if (!ph) return false
    let cleaned = ph.replace(/[^\d]/g, "")
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      cleaned = cleaned.slice(1)
    }
    // enforce NANP rules for area/exchange code start (2-9)
    return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(cleaned)
  }

  const handleNext = useCallback(async () => {
    if (!name || !email || !phoneNo || !address) {
      toast.error("Please fill in all fields")
      return
    }

    if (!isGmail(email)) {
      toast.error("Please enter a valid Gmail address (example@gmail.com)")
      return
    }

    if (!isUSPhone(phoneNo)) {
      toast.error("Please enter a valid US phone number")
      return
    }

    try {
      const payload = { name, email, phoneNo, address }
      const res = await createProperty(payload).unwrap()

      dispatch(setPropertyId(res.propertyId))
      localStorage.setItem("propertyId", res.propertyId)

      navigate("/payment")
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || "Failed to create property")
    }
  }, [name, email, phoneNo, address, createProperty, dispatch, navigate])

  useEffect(() => {
    registerNext(handleNext)
  }, [registerNext, handleNext])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Property & Contact Info
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
          We'll use this to send the upload link and label your analysis
        </p>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <FiUser /> Realtor Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter realtor name"
              value={name}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg bg-white"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <SlLocationPin /> Property Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter property address"
              value={address}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg bg-white"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <VscMail /> Email Address
            </label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="example@gmail.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg bg-white"
              onChange={handleChange}
              disabled={isLoading}
            />
            <span className="text-xs text-gray-600 mt-2">
              We'll text the upload link to this Email
            </span>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
              <BsTelephone /> Phone Number (US Only)
            </label>
            <input
              type="text"
              name="phoneNo"
              placeholder="(402) 555-1234"
              value={phoneNo}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg bg-white"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
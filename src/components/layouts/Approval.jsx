import React, { useEffect, useState, useCallback } from "react"
import { MdAdjust } from "react-icons/md"
import { MdOutlineCheck } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  useGetPropertyByUploadTokenQuery,
  useSendApprovalEmailMutation,
} from "../../redux/api/propertyApi"
import AdjustmentPopUp from "./AdjustmentPopUp"

const ROOMS = [
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "living-room", label: "Living Room", icon: "🛋️" },
  { id: "primary-bedroom", label: "Primary Bedroom", icon: "🛏️" },
  { id: "primary-bathroom", label: "Primary Bathroom", icon: "🚿" },
]

const Approval = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sendApprovalEmail, { isLoading }] = useSendApprovalEmailMutation()

  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get("token")

  const { data, isLoading: loadingProperty, isError } = useGetPropertyByUploadTokenQuery(token, {
    skip: !token,
  })

  const [showFeedbackPopUp, setShowFeedbackPopUp] = useState(false)
  const [lightbox, setLightbox] = useState({ open: false, url: "", roomLabel: "" })

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, url: "", roomLabel: "" })
  }, [])

  useEffect(() => {
    if (!lightbox.open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [lightbox.open])

  const address = data?.address ?? ""
  const photos = data?.photos ?? []
  const analysisResults = data?.analysisResults ?? []

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

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        <p className="text-center text-gray-600">Missing token.</p>
      </div>
    )
  }

  if (loadingProperty) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        <p className="text-center text-red-600">Could not load results.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="font-bold mb-2 text-center text-xl">Final Approval (Only for Realtor)</h2>
        <p className="text-sm text-gray-600 text-center mb-6">{address || "—"}</p>

        {/* RESULTS ABOVE BUTTONS */}
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-semibold">Final Results</h3>

          {ROOMS.map((room) => {
            const photo = photos.find((p) => p.roomType === room.id)
            const result = analysisResults.find((r) => r.roomType === room.id)

            return (
              <div key={room.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold">
                    {room.icon} {room.label}
                  </h4>

                  {result?.status === "PASS" && (
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                      ✓ Ready!
                    </span>
                  )}

                  {result?.status === "NEEDS_WORK" && (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                      Needs Work
                    </span>
                  )}
                </div>

                {photo?.url && (
                  <button
                    type="button"
                    onClick={() => setLightbox({ open: true, url: photo.url, roomLabel: room.label })}
                    className="w-full focus:outline-none"
                    aria-label={`View ${room.label} photo full size`}
                  >
                    <img
                      src={photo.url}
                      alt={room.label}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                      draggable={false}
                    />
                  </button>
                )}

                {result?.status === "NEEDS_WORK" && result?.narrative && (
                  <p className="text-sm text-gray-700 mb-2">{result.narrative}</p>
                )}

                {result?.status === "NEEDS_WORK" && result?.checklist?.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {result.checklist.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {result?.status === "PASS" && result?.verdict && (
                  <p className="text-sm text-emerald-800">{result.verdict}</p>
                )}

                {!result && <p className="text-sm text-gray-500">No result available yet.</p>}
              </div>
            )
          })}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 items-center justify-center">
          <button
            className="px-12 py-6 bg-emerald-600 text-white  sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            onClick={handleFinalApprovalClick}
            disabled={isLoading}
          >
            <MdOutlineCheck className="size-6" />
            GreenLight Approval
          </button>

          <button
            className="px-12 py-6 bg-yellow-400 text-white sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
            onClick={() => setShowFeedbackPopUp(true)}
          >
            <MdAdjust />
            Minor Adjusments
          </button>

          <button
            className="px-12 py-6 bg-emerald-600 text-white  sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            onClick={handleFinalApprovalClick}
            disabled={isLoading}
          >
            <MdOutlineCheck className="size-6" />
            Good as is
          </button>
        </div>
      </div>

      {/* FEEDBACK POPUP */}
      <AdjustmentPopUp isOpen={showFeedbackPopUp} onClose={() => setShowFeedbackPopUp(false)} token={token} />

      {/* IMAGE LIGHTBOX */}
      {lightbox.open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4" onClick={closeLightbox}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white text-3xl font-bold px-3 py-1"
              aria-label="Close full-size photo"
            >
              ×
            </button>

            <div className="text-white mb-2 text-center font-semibold">{lightbox.roomLabel}</div>

            <img
              src={lightbox.url}
              alt={lightbox.roomLabel || "Room photo"}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-black"
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Approval
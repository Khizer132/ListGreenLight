import React, { useEffect, useCallback, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useGetPropertyByUploadTokenQuery, useAnalyzePhotosMutation } from "../../redux/api/propertyApi"
import { useStepNavigation } from "../context/StepNavigationContext.jsx"

const ROOMS = [
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "living-room", label: "Living Room", icon: "🛋️" },
  { id: "primary-bedroom", label: "Primary Bedroom", icon: "🛏️" },
  { id: "primary-bathroom", label: "Primary Bathroom", icon: "🚿" },
]

const Analysis = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const { registerNext } = useStepNavigation()
  const { data, isLoading: loadingProperty, refetch } = useGetPropertyByUploadTokenQuery(token, {
    skip: !token,
  })
  const [triggerAnalyze, { isLoading: analyzing }] = useAnalyzePhotosMutation()

  const address = data?.address ?? ""
  const photos = data?.photos ?? []
  const analysisStatus = data?.analysisStatus ?? "pending"
  const analysisResults = data?.analysisResults ?? []

  const totalRooms = photos.length
  const analyzedCount = analysisResults.length
  const isAnalyzing = analysisStatus === "analyzing" || analyzing
  const isComplete = analysisStatus === "completed"
  const hasTriggeredAnalyze = useRef(false)

  const allRoomsPassed =
    isComplete && analysisResults.length > 0 && analysisResults.every((r) => r.status === "PASS")

  const [lightbox, setLightbox] = useState({
    open: false,
    url: "",
    roomLabel: "",
  })

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

  useEffect(() => {
    if (!lightbox.open) return
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox.open, closeLightbox])

  useEffect(() => {
    if (analysisStatus === "failed" || analysisStatus === "pending") {
      hasTriggeredAnalyze.current = false
    }
  }, [analysisStatus])

  useEffect(() => {
    if (!token || photos.length === 0) return
    if (analysisStatus !== "pending" && analysisStatus !== "failed") return
    if (hasTriggeredAnalyze.current) return
    hasTriggeredAnalyze.current = true

    triggerAnalyze({ token })
      .then(() => refetch())
      .catch(() => {
        hasTriggeredAnalyze.current = false
      })
  }, [token, photos.length, analysisStatus, triggerAnalyze, refetch])

  useEffect(() => {
    let interval
    if (isAnalyzing && token) {
      interval = setInterval(() => refetch(), 1500)
    }
    return () => clearInterval(interval)
  }, [isAnalyzing, token, refetch])

  useEffect(() => {
    if (allRoomsPassed) {
      localStorage.setItem("lg_cannot_go_back", "true")
    }
  }, [allRoomsPassed])

  const handleNext = useCallback(() => {
    const needsWork = analysisResults.some((r) => r.status === "NEEDS_WORK")

    if (needsWork && token) {
      navigate(`/upload-photos/${token}`)
    } else if (token) {
      navigate(`/final-approval?token=${token}`)
    } else {
      navigate("/final-approval")
    }
  }, [analysisResults, token, navigate])

  useEffect(() => {
    registerNext(handleNext)
  }, [registerNext, handleNext])

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        <p className="text-center text-gray-600">Invalid or missing upload link.</p>
      </div>
    )
  }

  if (loadingProperty && !data) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6">
        {analysisStatus === "failed" && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-4">
            <p className="text-sm text-amber-800 font-medium">
              Analysis failed (e.g. rate limit). Please wait a minute and refresh the page to try again.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {isComplete ? "Analysis complete" : "Analyzing Your Photos..."}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-2">{address || "—"}</p>

          {isAnalyzing && (
            <p className="text-sm text-amber-700 mb-2 font-medium">
              Usually 1–2 minutes. Please wait and don’t close this page.
            </p>
          )}

          <p className="text-sm text-gray-600 mb-2">
            {analyzedCount} of {totalRooms} rooms analyzed
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all"
              style={{ width: totalRooms ? `${(analyzedCount / totalRooms) * 100}%` : "0%" }}
            />
          </div>
        </div>

        {ROOMS.map((room) => {
          const photo = photos.find((p) => p.roomType === room.id)
          const result = analysisResults.find((r) => r.roomType === room.id)
          const thisRoomAnalyzing = isAnalyzing && photo && !result

          return (
            <div key={room.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold">
                  {room.icon} {room.label}
                </h3>

                {result?.status === "NEEDS_WORK" && (
                  <span className="bg-orange-100 text-orange-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">
                    {result.checklist?.length ?? 0} Items
                  </span>
                )}

                {result?.status === "PASS" && (
                  <span className="bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold w-fit">
                    ✓ Ready!
                  </span>
                )}

                {thisRoomAnalyzing && (
                  <span className="flex items-center gap-2 text-blue-600 text-sm">Analyzing...</span>
                )}
              </div>

              {photo && (
                <button
                  type="button"
                  onClick={() => setLightbox({ open: true, url: photo.url, roomLabel: room.label })}
                  className="w-full focus:outline-none"
                  aria-label={`View ${room.label} photo full size`}
                >
                  <img
                    src={photo.url}
                    alt={room.label}
                    className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 sm:mb-6 transition-transform duration-150 hover:scale-[1.01]"
                    draggable={false}
                  />
                </button>
              )}

              {thisRoomAnalyzing && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
                  <span>Analyzing this room...</span>
                </div>
              )}

              {result?.status === "NEEDS_WORK" && result.narrative && (
                <div className="space-y-3 mb-4">
                  <p className="font-semibold">Narrative</p>
                  <p className="text-sm text-gray-700">{result.narrative}</p>

                  {result.checklist?.length > 0 && (
                    <>
                      <p className="font-semibold">The Checklist:</p>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {result.checklist.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

              {result?.status === "PASS" && result.verdict && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 sm:p-6 rounded">
                  <h4 className="text-sm sm:text-base font-bold text-emerald-900 mb-2">
                    ✓ This Room Looks Great!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800">{result.verdict}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {lightbox.open && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 px-4"
          onClick={closeLightbox}
        >
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

export default Analysis
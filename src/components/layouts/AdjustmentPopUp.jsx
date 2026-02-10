import React, { useState } from "react"
import toast from "react-hot-toast"
import { useSendFeedbackMutation } from "../../redux/api/propertyApi"

const AdjustmentPopUp = ({ isOpen, onClose, token }) => {
  const [feedback, setFeedback] = useState("")
  const [sendFeedback, { isLoading }] = useSendFeedbackMutation()

  if (!isOpen) return null

  const submit = async (e) => {
    e.preventDefault()

    if (!token) {
      toast.error("Missing token. Open approval page with ?token=...")
      return
    }

    if (!feedback.trim()) {
      toast.error("Please enter feedback")
      return
    }

    try {
      await sendFeedback({ token, feedback: feedback.trim() }).unwrap()
      toast.success("Feedback submitted and emailed.")
      setFeedback("")
      onClose()
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit feedback")
    }
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-2">Minor Adjustments</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter the adjustments you want. This will be emailed to the property owner.
        </p>

        <form onSubmit={submit}>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-sm min-h-32.5"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback..."
            disabled={isLoading}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-400 text-white hover:bg-yellow-500 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdjustmentPopUp
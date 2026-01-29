import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

import { useCreateIntentMutation } from "../../redux/api/paymentApi.js"
import { useLazyGetUploadLinkQuery } from "../../redux/api/propertyApi.js"
import { useStepNavigation } from "../context/StepNavigationContext.jsx"
import toast from "react-hot-toast"


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const fieldStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#111827",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: { color: "#EF4444" },
  },
}

function PaymentForm({ propertyId }) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [createIntent, { isLoading: creatingIntent, error: intentError, isSuccess }] =
    useCreateIntentMutation();

  const [triggerGetUploadLink] = useLazyGetUploadLinkQuery()

  const { registerNext } = useStepNavigation()

  const [clientSecret, setClientSecret] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const CheckPaymentIntent = async () => {
      if (!propertyId) {
        setMessage("Missing propertyId. Please go back and complete your details first.")
        return
      }

      try {
        const res = await createIntent(propertyId).unwrap()
        setClientSecret(res.clientSecret)
      } catch (e) {
        setMessage("Failed to start payment. Please try again.")
      }
    }

    CheckPaymentIntent()
  }, [propertyId, createIntent])

  const handlePay = async () => {
    setMessage("")

    if (!stripe || !elements) return
    if (!clientSecret) {
      setMessage("Payment is still initializing. Please wait a moment.")
      return
    }

    const cardNumber = elements.getElement(CardNumberElement)

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
      },
    })

    if (error) {
      setMessage(error.message || "Payment failed.")
      return
    }

    if (paymentIntent?.status === "succeeded") {
      toast.success("Payment successful!")

      try {
        const res = await triggerGetUploadLink(propertyId).unwrap()
        const token = res.uploadToken

        navigate(`/upload-link-sent?token=${token}`)

      } catch (e) {
        setMessage("Payment succeeded, but we couldn't generate your upload link. Please refresh or contact support.")
        return
      }

      return
    }

    setMessage("Payment not completed. Please try again.")
  }

  useEffect(() => {
    registerNext(handlePay)
  }, [registerNext, clientSecret, stripe, elements])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-32">
      <div className="max-w-xl mx-auto">
        <div className="bg-gray-900 text-white p-3 sm:p-4 rounded-t-xl text-center text-xs sm:text-sm">
          ℹ️ Stripe Elements handles card fields securely
        </div>

        <div className="bg-white rounded-b-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">
              Stripe
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Secure Payment Processing</p>
          </div>

          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-sm sm:text-base">ListGreenLight</span>
              <span className="text-xl sm:text-2xl font-semibold text-emerald-600">
                $19.99
              </span>
            </div>
          </div>

          <div className="border-t pt-4 sm:pt-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
              Payment Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-semibold text-gray-700 block mb-2">
                  Card number
                </label>
                <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg bg-white">
                  <CardNumberElement options={fieldStyle} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block mb-2">
                    Expiry (MM/YY)
                  </label>
                  <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg bg-white">
                    <CardExpiryElement options={fieldStyle} />
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block mb-2">
                    CVC
                  </label>
                  <div className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg bg-white">
                    <CardCvcElement options={fieldStyle} />
                  </div>
                </div>
              </div>

              {message ? <p className="text-sm text-red-600">{message}</p> : null}

              <button
                type="button"
                onClick={handlePay}
                disabled={creatingIntent || !clientSecret || !stripe}
                className="block w-full bg-emerald-600 text-white py-3 sm:py-4 text-center rounded-lg font-bold text-sm sm:text-base hover:bg-emerald-700 disabled:opacity-60"
              >
                Pay $19.99
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Payment() {
  const propertyId = useMemo(() => localStorage.getItem("propertyId"), [])

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm propertyId={propertyId} />
    </Elements>
  )
}
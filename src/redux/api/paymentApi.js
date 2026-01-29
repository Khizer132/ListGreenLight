import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/payment`,
  }),
  endpoints: (builder) => ({
    createIntent: builder.mutation({
      query: (propertyId) => ({
        url: "/create-intent",
        method: "POST",
        body: { propertyId },
      }),
    }),
  }),
})

export const { useCreateIntentMutation } = paymentApi
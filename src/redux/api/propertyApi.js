import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/property`,
  }),
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/create-property",
        method: "POST",
        body: data,
      }),
    }),
    getUploadLink: builder.query({
      query: (propertyId) => ({
        url: `/${propertyId}/upload-link`,
        method: "GET",
      }),
    }),
    getPropertyByUploadToken: builder.query({
      query: (token) => ({
        url: `/by-upload-token/${token}`,
        method: "GET",
      }),
    }),
     confirmPaymentAndGetUploadLink: builder.mutation({
      query: (body) => ({
        url: "/confirm-payment-and-upload-link",
        method: "POST",
        body,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (formData) => ({
        url: "/upload-photo",
        method: "POST",
        body: formData,
      }),
    }),

  }),
})

export const { useCreatePropertyMutation, useGetUploadLinkQuery, useLazyGetUploadLinkQuery, useGetPropertyByUploadTokenQuery , useConfirmPaymentAndGetUploadLinkMutation, useUploadPhotoMutation } = propertyApi;
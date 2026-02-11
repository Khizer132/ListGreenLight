import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/property`,
  }),
  tagTypes: ['Property'],
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
      providesTags: (result, error, token) => [{ type: 'Property', id: token }],
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
      invalidatesTags: (result, error, formData) => [
        { type: 'Property', id: formData.get('token') }
      ],
    }),
    analyzePhotos: builder.mutation({
      query: (body) => ({
        url: "/analyze-photos",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: "Property", id: body.token }],
    }),
    sendApprovalEmail: builder.mutation({
      query: (body) => ({
        url: "/send-approval-email",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: "Property", id: body.token }],
    }),
    sendFeedback: builder.mutation({
      query: (body) => ({
        url: "/send-feedback",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: "Property", id: body.token }],
    }),
  }),
})

export const { useCreatePropertyMutation, useGetUploadLinkQuery, useLazyGetUploadLinkQuery, useGetPropertyByUploadTokenQuery, useConfirmPaymentAndGetUploadLinkMutation, useUploadPhotoMutation, useAnalyzePhotosMutation, useSendApprovalEmailMutation, useSendFeedbackMutation } = propertyApi;
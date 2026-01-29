import { configureStore } from "@reduxjs/toolkit"
import { propertyApi } from "./api/propertyApi.js"
import { paymentApi } from "./api/paymentApi.js"
import userReducer from "./features/userSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertyApi.middleware, paymentApi.middleware),
})
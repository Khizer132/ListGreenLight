import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: {
    name: "",
    email: "",
    phoneNo: "",
  },
  property: {
    address: "",
    propertyId: null,
    status: "draft",
  },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserField: (state, action) => {
      const { field, value } = action.payload
      state.user[field] = value
    },
    setPropertyField: (state, action) => {
      const { field, value } = action.payload
      state.property[field] = value
    },
    setPropertyId: (state, action) => {
      state.property.propertyId = action.payload
    },
    resetUser: () => initialState,
  },
})

export const { setUserField, setPropertyField, setPropertyId, resetUser } =
  userSlice.actions

export default userSlice.reducer
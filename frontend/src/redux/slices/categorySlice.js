import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    setCategory: (state, action) => {
      return action.payload;
    },
    addCategory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setCategory, addCategory } = categorySlice.actions;
export default categorySlice.reducer;

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
    updateCategory: (state, action) => {
      const index = state.findIndex((category) => category._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeCategory: (state, action) => {
      return state.filter((category) => category._id !== action.payload);
    },
  },
});

export const { setCategory, addCategory, removeCategory, updateCategory } = categorySlice.actions;
export default categorySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const accountsSlice = createSlice({
  name: "accounts",
  initialState: [],
  reducers: {
    setAccounts: (state, action) => {
      return action.payload;
    },
    addAccount: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setAccounts, addAccount } = accountsSlice.actions;
export default accountsSlice.reducer;

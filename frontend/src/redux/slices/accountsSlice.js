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
    getTotalBalance: (state) => {
      return state.reduce((acc, curr) => acc + curr.balance, 0);
    }
  },
});

export const { setAccounts, addAccount, getTotalBalance } = accountsSlice.actions;
export default accountsSlice.reducer;

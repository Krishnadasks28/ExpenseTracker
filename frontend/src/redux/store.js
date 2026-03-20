import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice.js";
import userReducer from "./slices/userReducer.js";
import accountsReducer from "./slices/accountsSlice.js";
import transactionReducer from "./slices/transactionSlice.js";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer,
    accounts: accountsReducer,
    transactions: transactionReducer,
  },
});

import {
  accountQuery,
  categoryQuery,
  getData,
  transactionQuery,
} from "../api/queries";
import { setAccounts } from "../redux/slices/accountsSlice";
import { setCategory } from "../redux/slices/categorySlice";
import { setTransactions } from "../redux/slices/transactionSlice";

export const fetchUserData = async (dispatch) => {
  try {
    const res = await getData(categoryQuery);
    if (res.ok) {
      const categoryList = await res.json();
      dispatch(setCategory(categoryList.data.categories));
    }

    const transactionRes = await getData(transactionQuery);
    if (transactionRes.ok) {
      const transactionList = await transactionRes.json();
      dispatch(setTransactions(transactionList.data.transactions));
    }
    const accountRes = await getData(accountQuery);
    if (accountRes.ok) {
      const accountList = await accountRes.json();
      dispatch(setAccounts(accountList.data.accounts));
    }
    return true;
  } catch (err) {
    console.error("Error fetching user data: ", err);
  }
};

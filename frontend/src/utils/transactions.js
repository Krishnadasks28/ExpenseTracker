import { getData, transactionQuery } from "../api/queries";
import { setTransactions } from "../redux/slices/transactionSlice";

// a function to calculate total number of transactions of an account
export const calculateTotalTransactions = (transactions, accountId) => {
  return transactions.filter(
    (t) =>
      (t.account && t.account._id === accountId) ||
      (t.fromAccount && t.fromAccount._id === accountId) ||
      (t.toAccount && t.toAccount._id === accountId),
  ).length;
};

export const fetchTransactions = async (dispatch) => {
  const transactionRes = await getData(transactionQuery);
  if (transactionRes.ok) {
    const transactionList = await transactionRes.json();
    dispatch(setTransactions(transactionList.data.transactions));
  }
};

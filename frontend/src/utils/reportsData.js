// create reusable function to generate data like total monthly income, total monthly expenses, and change in income and expenses compared to the previous month in percentage
import { useSelector } from "react-redux";

export const useReportsData = () => {
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);

  const getMonthlyIncome = (month, year) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "income" &&
          new Date(Number(transaction.date)).getMonth() === month &&
          new Date(Number(transaction.date)).getFullYear() === year,
      )
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getMonthlyExpenses = (month, year) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === "expense" &&
          new Date(Number(transaction.date)).getMonth() === month &&
          new Date(Number(transaction.date)).getFullYear() === year,
      )
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getChangeInPercentage = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : -100;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  return {
    getMonthlyIncome,
    getMonthlyExpenses,
    getChangeInPercentage,
  };
};

export const getBalanceForMonth = (
  accounts,
  transactions,
  targetMonth,
  targetYear,
) => {
  // 1. Get current total balance
  let totalBalance = accounts.reduce(
    (sum, acc) => sum + (Number(acc.balance) || 0),
    0,
  );

  const now = new Date();

  const isCurrentMonth =
    now.getMonth() === targetMonth && now.getFullYear() === targetYear;

  // 2. If current month → return directly
  if (isCurrentMonth) {
    return totalBalance;
  }

  // 3. Otherwise → reverse future transactions
  transactions.forEach((tx) => {
    const date = new Date(Number(tx.date));

    const isFuture =
      date.getFullYear() > targetYear ||
      (date.getFullYear() === targetYear && date.getMonth() > targetMonth);

    if (isFuture) {
      const amount = Number(tx.amount) || 0;

      // reverse effect
      if (tx.type === "income") {
        totalBalance -= amount;
      } else if (tx.type === "expense") {
        totalBalance += amount;
      }
    }
  });

  return totalBalance;
};

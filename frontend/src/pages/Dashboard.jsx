import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TransactionMenu from "../components/TransactionMenu";
import AddTransaction from "../components/AddTransaction";
import { use, useState } from "react";
import { useSelector } from "react-redux";
import { getBalanceForMonth, useReportsData } from "../utils/reportsData";

function Dashboard() {
  const transactionsData = useSelector((state) => state.transactions);
  // fetch total monthly income, total monthly expenses, and change in income and expenses compared to the previous month in percentage from transactionsData for displaying in the report section
  const { getMonthlyIncome, getMonthlyExpenses, getChangeInPercentage } =
    useReportsData();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const currentMonthIncome = getMonthlyIncome(currentMonth, currentYear);
  const currentMonthExpenses = getMonthlyExpenses(currentMonth, currentYear);
  const previousMonthIncome = getMonthlyIncome(previousMonth, previousYear);
  const previousMonthExpenses = getMonthlyExpenses(previousMonth, previousYear);
  const incomeChange = getChangeInPercentage(
    currentMonthIncome,
    previousMonthIncome,
  );
  const expenseChange = getChangeInPercentage(
    currentMonthExpenses,
    previousMonthExpenses,
  );
  // monthlyData of current year only till the current month from transactionsData for displaying in the chart
  // the monthlydata should only display the data of last six months

  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const month = new Date(currentYear, currentMonth - i, 1).toLocaleString(
      "en-US",
      { month: "short" },
    );
    const income = transactionsData
      .filter(
        (t) =>
          t.type === "income" &&
          new Date(Number(t.date)).getMonth() === currentMonth - i &&
          new Date(Number(t.date)).getFullYear() === currentYear,
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactionsData
      .filter(
        (t) =>
          t.type === "expense" &&
          new Date(Number(t.date)).getMonth() === currentMonth - i &&
          new Date(Number(t.date)).getFullYear() === currentYear,
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
    monthlyData.push({ month, income, expense });
  }

  const [showTransactionModel, setTransactionModel] = useState(false);
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const totalBalance = accounts.reduce(
    (sum, acc) => sum + (Number(acc.balance) || 0),
    0,
  );
  const previousMonthBalance = getBalanceForMonth(
    accounts,
    transactions,
    previousMonth,
    previousYear,
  );
  const balanceChange = getChangeInPercentage(
    totalBalance,
    previousMonthBalance,
  );

  let recentTransactions = [];
  if (transactions.length > 0) {
    recentTransactions = transactions.slice(0, 5);
  }
  return (
    <div className="px-2.5 lg:px-10 min-h-screen w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold">Dashboard</h1>
          <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
            Welome back! Here's your financial overview.
          </p>
        </div>

        <div>
          <button
            onClick={() => setTransactionModel(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs lg:text-lg px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} className="h-5 w-5 hidden sm:inline" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* dashboard report section */}
      <div className="flex sm:flex-row flex-col gap-3 sm:gap-5 mt-6">
        <div className="py-4 px-6 sm:p-8 rounded-2xl shadow-sm border-t dark:border-b border-x border-slate-200 w-full">
          <div className="flex gap-12 mb-5 justify-between ">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-400 whitespace-nowrap ">
              Total Balance
            </h4>
            <Wallet className=" text-blue-500" />
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold">
            {totalBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
          <p className="xl:flex gap-3 text-slate-500 dark:text-slate-400 items-center text-sm xl:text-lg text-muted-foreground mt-1">
            {/* total balance difference in percentage from last month */}
            <span className="text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="h-5 w-5" />
              {balanceChange > 0 ? "+" : ""}
              {Math.abs(balanceChange).toFixed(2)}%
            </span>
            from last month
          </p>
        </div>

        {/*  */}

        <div className="py-4 px-6 sm:p-8 rounded-2xl shadow-sm border-t dark:border-b border-x border-slate-200 w-full">
          <div className="flex gap-12 mb-5 justify-between ">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-400 whitespace-nowrap ">
              Total Income (
              {new Date(currentYear, currentMonth).toLocaleString("en-US", {
                month: "short",
              })}
              )
            </h4>
            <TrendingUp className=" text-emerald-500" />
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold text-emerald-500">
            {currentMonthIncome.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
          <p className="xl:flex gap-3 text-slate-500 dark:text-slate-400 items-center text-sm xl:text-lg text-muted-foreground mt-1">
            <span
              className={`flex items-center gap-1 ${
                incomeChange > 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {incomeChange > 0 ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              {incomeChange > 0 ? "+" : ""}
              {incomeChange.toFixed(2)}%
            </span>
            from last month
          </p>
        </div>

        {/*  */}

        <div className="py-4 px-6 sm:p-8  rounded-2xl shadow-sm border-t dark:border-b border-x border-slate-200 w-full">
          <div className="flex gap-12 mb-5 justify-between ">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-400 whitespace-nowrap ">
              Total Expense (
              {new Date(currentYear, currentMonth).toLocaleString("en-US", {
                month: "short",
              })}
              )
            </h4>
            <TrendingDown className=" text-red-500" />
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold text-red-500">
            {currentMonthExpenses.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
          <p className="xl:flex gap-3 text-slate-500 dark:text-slate-400 items-center text-sm xl:text-lg text-muted-foreground mt-1">
            <span
              className={`flex items-center gap-1 ${
                expenseChange > 0 ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {expenseChange > 0 ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              {expenseChange > 0 ? "+" : ""}
              {expenseChange.toFixed(2)}%
            </span>
            from last month
          </p>
        </div>

        {/*  */}
      </div>

      {/* chart section */}

      <div className="flex flex-col xl:flex-row gap-5 mt-5 w-full">
        <div className="shadow-sm border-t dark:border-b border-x border-slate-200 rounded-xl p-2 lg:p-8 w-full">
          <h1 className="text-xl mb-3">Monthly Overview</h1>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-sm border-t dark:border-b border-x border-slate-200 rounded-xl p-2 lg:p-8 w-full">
          <h1 className="text-xl mb-3">Spending Trend</h1>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="w-full rounded-xl mt-5 shadow-sm border-t dark:border-b border-x border-slate-200 p-2 pt-4 px-4 md:p-8">
        <div className="flex justify-between text-sm lg:text-xl">
          <h1>Recent Transactions</h1>
          <NavLink to={"/transactions"}>
            <span className="hover:bg-slate-100 dark:hover:text-black p-2 rounded-2xl">
              View All
            </span>
          </NavLink>
        </div>
        <TransactionMenu transactions={recentTransactions} />
      </div>
      <AddTransaction
        showModel={showTransactionModel}
        setShowModel={setTransactionModel}
      />
    </div>
  );
}

export default Dashboard;

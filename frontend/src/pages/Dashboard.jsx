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
import { useState } from "react";

function Dashboard() {
  const monthlyData = [
    { month: "Jan", income: 4500, expense: 3200 },
    { month: "Feb", income: 5200, expense: 3800 },
    { month: "Mar", income: 4800, expense: 3500 },
    { month: "Apr", income: 5500, expense: 4100 },
    { month: "May", income: 6000, expense: 4500 },
    { month: "Jun", income: 5800, expense: 4200 },
  ];

  const [showTransactionModel, setTransactionModel] = useState(false);

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
        <div className="py-4 px-6 sm:p-8 rounded-2xl shadow-sm border-t border-x border-slate-200 w-full">
          <div className="flex gap-12 mb-5 justify-between ">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-400 whitespace-nowrap ">
              Total Balance
            </h4>
            <Wallet className=" text-blue-500" />
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold">$12,450</h1>
          <p className="xl:flex gap-3 text-slate-500 dark:text-slate-400 items-center text-sm xl:text-lg text-muted-foreground mt-1">
            <span className="text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="h-5 w-5" />
              +12.5%
            </span>
            from last month
          </p>
        </div>

        {/*  */}

        <div className="py-4 px-6 sm:p-8 rounded-2xl shadow-sm border-t border-x border-slate-200 w-full">
          <div className="flex gap-12 mb-5 justify-between ">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-400 whitespace-nowrap ">
              Total Income
            </h4>
            <TrendingUp className=" text-emerald-500" />
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold text-emerald-500">
            $6,800
          </h1>
          <p className="xl:flex gap-3 text-slate-500 dark:text-slate-400 items-center text-sm xl:text-lg text-muted-foreground mt-1">
            <span className="text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="h-5 w-5" />
              +8.2%
            </span>
            from last month
          </p>
        </div>

        {/*  */}

        <div className="py-4 px-6 sm:p-8  rounded-2xl shadow-sm border-t border-x border-slate-200 w-full">
          <div className="flex gap-12 mb-5 justify-between ">
            <h4 className="text-lg font-medium text-slate-700 dark:text-slate-400 whitespace-nowrap ">
              Total Expense
            </h4>
            <TrendingDown className=" text-red-500" />
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold text-red-500">
            $-4,350
          </h1>
          <p className="xl:flex gap-3 text-slate-500 dark:text-slate-400 items-center text-sm xl:text-lg text-muted-foreground mt-1">
            <span className="text-red-600 flex items-center gap-1">
              <ArrowDownRight className="h-5 w-5" />
              +4.5%
            </span>
            from last month
          </p>
        </div>

        {/*  */}
      </div>

      {/* chart section */}

      <div className="flex flex-col xl:flex-row gap-5 mt-5 w-full">
        <div className="shadow-sm border-t border-x border-slate-200 rounded-xl p-2 lg:p-8 w-full">
          <h1 className="text-xl mb-3">Monthly Overview</h1>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
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
              <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-sm border-t border-x border-slate-200 rounded-xl p-2 lg:p-8 w-full">
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
      <div className="w-full rounded-xl mt-5 shadow-sm border-t border-x border-slate-200 p-2 pt-4 px-4 md:p-8">
        <div className="flex justify-between text-sm lg:text-xl">
          <h1>Recent Transactions</h1>
          <NavLink to={"/transactions"}>
            <span className="hover:bg-slate-100 dark:hover:text-black p-2 rounded-2xl">
              View All
            </span>
          </NavLink>
        </div>
        <TransactionMenu />
      </div>
      <AddTransaction
        showModel={showTransactionModel}
        setShowModel={setTransactionModel}
      />
    </div>
  );
}

export default Dashboard;

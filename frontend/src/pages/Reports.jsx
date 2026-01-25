import React, { useState } from "react";
import { Download, TrendingUp, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomSelect from "../components/ui/CustomSelect";

const spendingTrendData = [
  { month: "Jul", spending: 3800 },
  { month: "Aug", spending: 4200 },
  { month: "Sep", spending: 3500 },
  { month: "Oct", spending: 4100 },
  { month: "Nov", spending: 3900 },
  { month: "Dec", spending: 4500 },
  { month: "Jan", spending: 4300 },
];

const incomeVsExpenseData = [
  { month: "Jul", income: 5100, expense: 3800, savings: 1300 },
  { month: "Aug", income: 4800, expense: 4200, savings: 600 },
  { month: "Sep", income: 5400, expense: 3500, savings: 1900 },
  { month: "Oct", income: 5900, expense: 4100, savings: 1800 },
  { month: "Nov", income: 5700, expense: 3900, savings: 1800 },
  { month: "Dec", income: 6200, expense: 4500, savings: 1700 },
  { month: "Jan", income: 6900, expense: 4300, savings: 2600 },
];

const expenseByCategoryData = [
  { name: "Housing", value: 33, color: "#8b5cf6" },
  { name: "Food & Dining", value: 27, color: "#f59e0b" },
  { name: "Shopping", value: 17, color: "#ec4899" },
  { name: "Entertainment", value: 7, color: "#06b6d4" },
  { name: "Transportation", value: 10, color: "#3b82f6" },
  { name: "Others", value: 5, color: "#9ca3af" },
];

const StatCard = ({ label, value, change, color }) => {
  const isPositive = change.startsWith("+");
  const changeColor =
    label === "Total Expense"
      ? isPositive
        ? "text-red-600"
        : "text-green-600"
      : "text-green-600";

  return (
    <div className="rounded-xl border border-gray-200 p-6">
      <p className="dark:text-slate-200 text-slate-500 text-sm mb-2">{label}</p>
      <h3 className={`text-3xl font-bold mb-2 ${color}`}>{value}</h3>
      <p className={`text-sm ${changeColor}`}>{change} vs last month</p>
    </div>
  );
};

const InsightCard = ({
  icon: Icon,
  title,
  message,
  bgColor,
  titleColor,
  messageColor,
}) => {
  return (
    <div className={`${bgColor} rounded-lg p-4 border-l-4 ${titleColor}`}>
      <div className="flex gap-3">
        <Icon className={`${titleColor} shrink-0`} size={20} />
        <div>
          <h4 className={`font-bold ${titleColor} mb-1`}>{title}</h4>
          <p className={messageColor}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default function Reports() {
  const [month, setMonth] = useState("December 2025");

  return (
    <div className="px-2.5 lg:px-10 min-h-screen w-full">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold">
              Reports & Analytics
            </h1>
            <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
              Detailed insights into your spending patterns
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <CustomSelect />
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg dark:hover:bg-white dark:hover:text-black cursor-pointer hover:bg-gray-50 transition-colors">
              <Download size={20} />
              Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Income"
            value="$6,800"
            change="+8.2%"
            color="text-emerald-500"
          />
          <StatCard
            label="Total Expense"
            value="$4,350"
            change="-3.3%"
            color="text-red-500"
          />
          <StatCard
            label="Total Savings"
            value="$2,450"
            change="+44.1%"
            color="text-blue-500"
          />
          <StatCard
            label="Savings Rate"
            value="36%"
            change=""
            color="dark:text-gray-300 text-slate-500"
          >
            <p className="text-sm text-gray-600">Target: 30%</p>
          </StatCard>
        </div>

        {/* Charts Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Expense by Category */}
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl mb-6">
              Expense by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseByCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Spending Trend */}
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl mb-6">
              Spending Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="spending"
                  stroke="#ef4444"
                  dot={{ fill: "#ef4444", r: 5 }}
                  activeDot={{ r: 7 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income vs Expense vs Savings Chart */}
        <div className="rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-xl mb-6">
            Income vs Expense vs Savings
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={incomeVsExpenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="income" fill="#10b981" />
              <Bar dataKey="expense" fill="#ef4444" />
              <Bar dataKey="savings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Insights */}
        <div className="space-y-4">
          <h3 className="text-xl mb-4">
            Financial Insights
          </h3>

          <InsightCard
            icon={TrendingUp}
            title="Great Progress!"
            message="Your savings rate increased by 44% compared to last month. You're on track to meet your financial goals."
            bgColor="bg-emerald-50"
            titleColor="text-emerald-700"
            messageColor="text-emerald-600"
          />

          <InsightCard
            icon={TrendingUp}
            title="Spending Pattern"
            message="Most of your expenses are in Housing (34%) and Food & Dining (29%). Consider budgeting these categories."
            bgColor="bg-blue-50"
            titleColor="text-blue-700"
            messageColor="text-blue-600"
          />

          <InsightCard
            icon={AlertCircle}
            title="Opportunity"
            message="You spent $320 on entertainment this month. Consider reducing this by 20% to save an additional $64/month."
            bgColor="bg-yellow-50"
            titleColor="text-yellow-700"
            messageColor="text-yellow-600"
          />
        </div>
      </div>
    </div>
  );
}

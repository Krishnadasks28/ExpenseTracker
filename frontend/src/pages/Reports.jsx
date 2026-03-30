import React, { useState } from "react";
import { Download, TrendingUp, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { exportReportsToExcel } from "../utils/exportExcel";
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

const StatCard = ({ label, value, change, color, children }) => {
  const isPositive = change?.startsWith("+");
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
      {change && <p className={`text-sm ${changeColor}`}>{change} vs last month</p>}
      {children}
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
  const [month, setMonth] = useState("All Time");
  const transactions = useSelector(state => state.transactions || []);
  
  // Calculate stats based on real data
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const MathAbsExpense = Math.abs(totalExpense);
  const totalSavings = totalIncome - MathAbsExpense;
  const savingsRate = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(0) : 0;

  // Real Expense by Category
  const expenseByCategoryMap = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const cat = t.category?.name || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + Math.abs(t.amount || 0);
      return acc;
    }, {});
    
  const colors = ["#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4", "#3b82f6", "#9ca3af", "#ef4444", "#10b981"];
  const expenseByCategoryData = Object.keys(expenseByCategoryMap)
    .map((name, i) => ({
      name,
      value: expenseByCategoryMap[name],
      color: colors[i % colors.length]
    }))
    .sort((a, b) => b.value - a.value);

  // Group by month for trends
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const trendsMap = {};
  
  transactions.forEach(t => {
    const d = new Date(Number(t.date));
    const label = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(-2)}`;
    if (!trendsMap[label]) trendsMap[label] = { month: label, income: 0, expense: 0, spending: 0, savings: 0, sortKey: Number(t.date) };
    if (t.type === 'income') trendsMap[label].income += t.amount;
    if (t.type === 'expense') {
      const amt = Math.abs(t.amount);
      trendsMap[label].expense += amt;
      trendsMap[label].spending += amt;
    }
    trendsMap[label].savings = trendsMap[label].income - trendsMap[label].expense;
  });

  const incomeVsExpenseData = Object.values(trendsMap).sort((a, b) => a.sortKey - b.sortKey);
  const spendingTrendData = incomeVsExpenseData.map(d => ({ month: d.month, spending: d.spending }));

  const handleExport = () => {
    const exportData = incomeVsExpenseData.map(d => ({
      Month: d.month,
      Income: d.income,
      Expense: d.expense,
      Savings: d.savings
    }));
    exportReportsToExcel(exportData);
  };

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
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg dark:hover:bg-white dark:hover:text-black cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Download size={20} />
              Export Excel
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            color="text-emerald-500"
          />
          <StatCard
            label="Total Expense"
            value={`$${MathAbsExpense.toLocaleString()}`}
            color="text-red-500"
          />
          <StatCard
            label="Total Savings"
            value={`$${totalSavings.toLocaleString()}`}
            color="text-blue-500"
          />
          <StatCard
            label="Savings Rate"
            value={`${savingsRate}%`}
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
                  label={({ name, value }) => `${name} ${((value/MathAbsExpense)*100).toFixed(0)}%`}
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
            title="Healthy Finances"
            message={`Your savings rate is ${savingsRate}%. Keep up the good work saving for your future!`}
            bgColor="bg-emerald-50"
            titleColor="text-emerald-700"
            messageColor="text-emerald-600"
          />

          {expenseByCategoryData.length > 0 && (
            <InsightCard
              icon={AlertCircle}
              title="Top Spending Category"
              message={`You spent the most in ${expenseByCategoryData[0].name}. Try to look for ways to reduce expenses in this bucket.`}
              bgColor="bg-blue-50"
              titleColor="text-blue-700"
              messageColor="text-blue-600"
            />
          )}

          {MathAbsExpense > 0 && (
            <InsightCard
              icon={AlertCircle}
              title="Opportunity"
              message={`You spent $${MathAbsExpense.toLocaleString()} this period. Consider reducing this by 20% to save an additional $${(MathAbsExpense * 0.2).toFixed(0)}.`}
              bgColor="bg-yellow-50"
              titleColor="text-yellow-700"
              messageColor="text-yellow-600"
            />
          )}

        </div>
      </div>
    </div>
  );
}

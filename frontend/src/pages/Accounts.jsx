import {
  Plus,
  Wallet,
  Building2,
  CreditCard,
  Smartphone,
  MoreVertical,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import AddAccount from "../components/AddAccount";
import { useState } from "react";

export default function Accounts() {
  const [showModel, setShowModel] = useState(false);

  const accounts = [
    {
      id: 1,
      name: "Cash",
      icon: Wallet,
      balance: 450.75,
      transactions: 45,
      lastTx: { name: "Coffee Shop", amount: -25.5, type: "expense" },
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      id: 2,
      name: "Bank Account",
      icon: Building2,
      balance: 8450.0,
      transactions: 128,
      lastTx: { name: "Salary Deposit", amount: 3200.0, type: "income" },
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      name: "Credit Card",
      icon: CreditCard,
      balance: -1250.0,
      transactions: 67,
      lastTx: { name: "Online Shopping", amount: -89.99, type: "expense" },
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      id: 4,
      name: "Digital Wallet",
      icon: Smartphone,
      balance: 3800.0,
      transactions: 92,
      lastTx: { name: "Freelance Payment", amount: 500.0, type: "income" },
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const totalBalance = 11450.75;

  return (
    <div className="px-3 lg:px-10 min-h-screen w-full">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl sm:text-4xl font-semibold">Accounts</h1>
            <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
              Manage your financial accounts.
            </p>
          </div>
          <button
            onClick={() => setShowModel(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs lg:text-lg px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} className="h-5 w-5 hidden sm:inline" />
            New Account
          </button>
        </div>

        {/* Total Balance Card */}
        <div className="bg-emerald-500 rounded-2xl p-4 lg:p-8 text-white mb-8 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-teal-100 text-sm mb-3">Total Balance</p>
              <p className="text-2xl lg:text-5xl font-bold mb-2">
                $
                {totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-teal-100">Across all accounts</p>
            </div>
            <Wallet
              className="h-9 w-9 lg:h-14 lg:w-14 opacity-70"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {accounts.map((account) => {
            const Icon = account.icon;
            const isNegative = account.balance < 0;

            return (
              <div
                key={account.id}
                className="rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`${account.iconBg} p-3 rounded-lg`}>
                      <Icon size={24} className={account.iconColor} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{account.name}</h3>
                      <p className="text-xs text-gray-500">
                        {account.transactions} transactions
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical size={20} />
                  </button>
                </div>

                {/* Balance */}
                <div className="mb-6 pb-6 border-b border-slate-200 ">
                  <p className="text-xs text-gray-500 mb-2">Current Balance</p>
                  <p
                    className={`text-3xl font-bold ${isNegative ? "text-red-600" : "text-emerald-500"}`}
                  >
                    {isNegative ? "-" : ""}$
                    {Math.abs(account.balance).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Last Transaction */}
                <div>
                  <p className="text-xs text-gray-500 mb-3">Last Transaction</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {account.lastTx.type === "expense" ? (
                        <TrendingDown size={18} className="text-red-500" />
                      ) : (
                        <TrendingUp size={18} className="text-teal-500" />
                      )}
                      <span className="text-sm">{account.lastTx.name}</span>
                    </div>
                    <span
                      className={`font-semibold text-sm ${account.lastTx.type === "expense" ? "text-red-500" : "text-teal-500"}`}
                    >
                      {account.lastTx.type === "expense" ? "-" : "+"}$
                      {Math.abs(account.lastTx.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddAccount showModel={showModel} setShowModel={setShowModel} />
    </div>
  );
}

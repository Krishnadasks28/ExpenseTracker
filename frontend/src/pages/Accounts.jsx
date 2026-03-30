import {
  Plus,
  Wallet,
  Building2,
  CreditCard,
  Smartphone,
  MoreVertical,
  TrendingDown,
  TrendingUp,
  Banknote,
  PiggyBank,
} from "lucide-react";
import AddAccount from "../components/AddAccount";
import { useEffect, useState } from "react";
import { accountQuery, getData } from "../api/queries.js";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../redux/slices/accountsSlice.js";
import { calculateTotalTransactions } from "../utils/transactions.js";

export default function Accounts() {
  const [showModel, setShowModel] = useState(false);
  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await getData(accountQuery);
        const data = await res.json();
        if (data?.data?.accounts) {
          dispatch(setAccounts(data.data.accounts));
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

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
            const isNegative = account.balance < 0;
            const accountTransactions = transactions
              .filter(t => t.account?._id === account._id || t.fromAccount?._id === account._id || t.toAccount?._id === account._id)
              .sort((a, b) => Number(b.date) - Number(a.date));
            const lastTransaction = accountTransactions.length > 0 ? accountTransactions[0] : null;
            
            return (
              <div
                key={account.name}
                className="rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg`}>{/* Bank logo */}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{account.name}</h3>
                      <p className="text-xs text-gray-500">
                        {calculateTotalTransactions(transactions, account._id)}{" "}
                        transactions
                        {/* set number of transactions */}
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
                  {lastTransaction ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {lastTransaction.type === 'expense' ? (
                          <TrendingDown size={18} className="text-red-500" />
                        ) : lastTransaction.type === 'income' ? (
                          <TrendingUp size={18} className="text-teal-500" />
                        ) : (
                          // Contra
                          <TrendingUp size={18} className="text-blue-500" /> 
                        )}
                        <span className="text-sm">
                          {lastTransaction.category?.name || "Transfer"}
                        </span>
                      </div>
                      <span
                        className={`font-semibold text-sm ${
                          lastTransaction.type === 'expense' 
                            ? "text-red-500" 
                            : lastTransaction.type === 'income' 
                              ? "text-teal-500" 
                              : "text-blue-500"
                        }`}
                      >
                        {lastTransaction.type === 'expense' ? "-" : "+"}$
                        {Math.abs(lastTransaction.amount).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No transactions</p>
                  )}
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

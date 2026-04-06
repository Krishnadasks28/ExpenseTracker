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
  Edit2,
  Trash2,
} from "lucide-react";
import AddAccount from "../components/AddAccount";
import ConfirmModal from "../components/ConfirmModal";
import { useEffect, useState } from "react";
import { accountQuery, getData } from "../api/queries.js";
import { deleteAccount } from "../api/accounts.api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../redux/slices/accountsSlice.js";
import { calculateTotalTransactions } from "../utils/transactions.js";

export default function Accounts() {
  const [showModel, setShowModel] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // ID of account with open menu

  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const fetchAccounts = async () => {
    try {
      const res = await getData(accountQuery);
      const data = await res.json();
      if (data?.data?.accounts) {
        dispatch(setAccounts(data.data.accounts));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setModalMode("edit");
    setShowModel(true);
    setActiveMenu(null);
  };

  const handleDeleteClick = (account) => {
    setAccountToDelete(account);
    setShowDeleteConfirm(true);
    setActiveMenu(null);
  };

  const confirmDelete = async () => {
    if (!accountToDelete) return;

    try {
      const res = await deleteAccount(accountToDelete._id);
      if (res.ok) {
        toast.success("Account deleted successfully");
        fetchAccounts();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete account");
      }
    } catch (err) {
      toast.error("An error occurred while deleting the account");
    } finally {
      setShowDeleteConfirm(false);
      setAccountToDelete(null);
    }
  };

  const handleAddNew = () => {
    setModalMode("add");
    setSelectedAccount(null);
    setShowModel(true);
  };

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
            onClick={handleAddNew}
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
                  <div className="relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === account._id ? null : account._id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <MoreVertical size={20} />
                    </button>
                    
                    {activeMenu === account._id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setActiveMenu(null)}
                        ></div>
                        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                          <button 
                            onClick={() => handleEdit(account)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(account)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-rose-500"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
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
      <AddAccount 
        showModel={showModel} 
        setShowModel={setShowModel} 
        mode={modalMode}
        accountData={selectedAccount}
      />
      <ConfirmModal 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Account"
        message={`Are you sure you want to delete the account "${accountToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}

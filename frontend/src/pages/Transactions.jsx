import { Download, Filter, Plus, Search as SearchIcon } from "lucide-react";
import AddTransaction from "../components/AddTransaction";
import { useEffect, useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import TransactionMenu from "../components/TransactionMenu";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../components/ConfirmModal";
import { deleteTransaction } from "../api/transactions.api";
import { fetchTransactions } from "../utils/transactions";
import { exportTransactionsToExcel } from "../utils/exportExcel";
import toast from "react-hot-toast";
import TransactionDetailModal from "../components/TransactionDetailModal";

const Transactions = () => {
  const [showTransactionModel, setTransactionModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactions);
  const categories = useSelector((state) => state.category);

  const filteredCategories = categories.filter((category) => {
    if (activeFilter === "All") return true;
    return category.type === activeFilter.toLowerCase();
  });

  useEffect(() => {
    setActiveCategory(null);
    setCurrentPage(1);
  }, [activeFilter]);
  const processedTransactions = transactions
    .filter((transaction) => {
      // type filter
      if (activeFilter !== "All") {
        if (transaction.type !== activeFilter.toLowerCase()) return false;
      }

      // category filter
      if (activeCategory) {
        if (!transaction.category) return false;
        if (
          transaction.category.name !== activeCategory
        )
          return false;
      }
      
      // search filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        if (
          !transaction.description?.toLowerCase().includes(query) &&
          !transaction.amount?.toString().includes(query)
        ) return false;
      }

      return true;
    })
    .sort((a, b) => Number(b.date) - Number(a.date));

  const pageSize = 10; // Number of transactions per page

  // transactions filtration with pagination
  const paginatedTransactions = processedTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleDelete = async (id) => {
    try {
      const res = await deleteTransaction(id);
      if (res.ok) {
        toast.success("Transaction deleted successfully");
        fetchTransactions(dispatch);
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error deleting transaction");
    }
  };

  return (
    <div className="px-3 lg:px-10 min-h-screen w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold">Transactions</h1>
          <p className="text-xs sm:text-lg text-slate-500 dark:text-slate-400">
            View and manage all your transactions.
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => exportTransactionsToExcel(processedTransactions)}
            className="text-xs lg:text-lg md:px-4 px-2 rounded-xl cursor-pointer ont-bold flex items-center gap-1 sm:gap-3 border-slate-200 border dark:hover:bg-white dark:hover:text-black hover:bg-slate-200"
          >
            <Download size={18} />
            <span className="hidden lg:inline">Export</span>
          </button>
          <button
            onClick={() => {
              setEditingTransaction(null);
              setTransactionModel(true);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs lg:text-lg px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={18} className="h-5 w-5 hidden sm:inline" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* filter section */}

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 rounded-2xl mt-5 shadow-sm border-t dark:border-b border-x border-slate-200 lg:p-8 p-4">
        <div className="flex items-center gap-3">
          <Filter className="text-slate-400" size={20} />
          <h1 className="font-medium me-3">Filters:</h1>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {["All", "Income", "Expense","Contra"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`w-[45%] lg:w-auto px-2 lg:px-4 py-1 lg:py-2 rounded-lg font-medium text-sm lg:text-lg transition-colors ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-white"
                    : "dark:bg-black dark:hover:bg-white dark:text-white dark:hover:text-black bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="w-full sm:w-auto flex flex-1 items-center gap-2 bg-slate-100 dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2">
            <SearchIcon size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm dark:text-white"
            />
          </div>
          <div className="w-full sm:w-auto">
            <CustomSelect
              placeholder="Select a category"
              options={filteredCategories.map((category) => category.name)}
              onChange={setActiveCategory}
              value={activeCategory}
            />
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl mt-5 shadow-sm border-t border-x border-slate-200 dark:border-b p-4 md:p-8">
        <h1 className="text-lg font-medium">
          {processedTransactions.length} Transactions
        </h1>

        <TransactionMenu 
          transactions={paginatedTransactions} 
          onEdit={(t) => {
            setEditingTransaction(t);
            setTransactionModel(true);
          }}
          onDelete={(id) => setDeleteConfirmId(id)}
          onClickItem={(t) => setSelectedTx(t)}
        />
      </div>

      <div>
        <Pagination
          totalPages={Math.ceil(processedTransactions.length / pageSize)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <AddTransaction
        showModel={showTransactionModel}
        setShowModel={setTransactionModel}
        editingTransaction={editingTransaction}
      />
      <ConfirmModal 
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => handleDelete(deleteConfirmId)}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This cannot be undone."
      />
      <TransactionDetailModal 
        transaction={selectedTx} 
        onClose={() => setSelectedTx(null)} 
      />
    </div>
  );
};

export default Transactions;

import { Download, Filter, Plus } from "lucide-react";
import AddTransaction from "../components/AddTransaction";
import { useState } from "react";
import CustomSelect from "../components/ui/CustomSelect";
import TransactionMenu from "../components/TransactionMenu";
import Pagination from "../components/Pagination";

const Transactions = () => {
  const [showTransactionModel, setTransactionModel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");

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
          <button className="text-xs lg:text-lg md:px-4 md:py-2 px-2 py-1 rounded-xl cursor-pointer ont-bold flex items-center gap-1 sm:gap-3 border-slate-200 border hover:bg-slate-200">
            <Download />
            Export
          </button>
          <button
            onClick={() => setTransactionModel(true)}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs lg:text-lg px-2 lg:px-4 py-2 rounded-lg font-medium transition-colors"
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
          <div className="flex gap-3">
            {["All", "Income", "Expense"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="">
          <CustomSelect />
        </div>
      </div>

      <div className="w-full rounded-xl mt-5 shadow-sm border-t border-x border-slate-200 dark:border-b p-4 md:p-8">
        <h1 className="text-lg font-medium">10 Transactions</h1>

        <TransactionMenu />
      </div>

      <div>
        <Pagination
          totalPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <AddTransaction
        showModel={showTransactionModel}
        setShowModel={setTransactionModel}
      />
    </div>
  );
};

export default Transactions;

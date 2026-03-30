import { SearchIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import TransactionDetailModal from "./TransactionDetailModal";

function Search({ className }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const dropdownRef = useRef(null);
  
  const transactions = useSelector(state => state.transactions || []);
  
  const searchResults = query.trim() 
    ? transactions.filter(t => 
        t.description?.toLowerCase().includes(query.toLowerCase()) ||
        t.amount.toString().includes(query)
      ).slice(0, 5) // top 5
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div ref={dropdownRef} className={`relative ${className} ms-10 lg:ms-20 w-full sm:w-1/3`}>
        <div className={`bg-slate-200 dark:bg-black focus-within:ring-2 transition focus-within:ring-blue-400 dark:focus-within:ring-slate-300 dark:border flex gap-2 items-center w-full py-2 px-4 rounded-xl`}>
          <SearchIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Transaction..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => setIsOpen(true)}
            className="w-full focus:outline-none placeholder-gray-600 dark:placeholder-gray-400 bg-transparent"
          />
        </div>
        
        {isOpen && query.trim() && searchResults.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden z-[60]">
            {searchResults.map(tx => (
              <div 
                key={tx._id} 
                onClick={() => { setSelectedTx(tx); setIsOpen(false); setQuery(""); }}
                className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tx.category?.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{tx.description || tx.category?.name}</p>
                    <p className="text-xs text-slate-500">{new Date(Number(tx.date)).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-medium ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
        {isOpen && query.trim() && searchResults.length === 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-4 text-center text-slate-500 z-[60]">
            No transactions found.
          </div>
        )}
      </div>
      
      {selectedTx && (
        <TransactionDetailModal 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </>
  );
}

export default Search;

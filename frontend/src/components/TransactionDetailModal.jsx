import { X } from "lucide-react";

const TransactionDetailModal = ({ transaction, onClose }) => {
  if (!transaction) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transaction Details</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-slate-500">Date</p>
            <p className="font-medium">{new Date(Number(transaction.date)).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Amount</p>
            <p className={`font-medium ${transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Type</p>
            <p className="font-medium capitalize">{transaction.type}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Category</p>
            <p className="font-medium flex items-center gap-2">
              <span className="text-xl">{transaction.category?.icon}</span> {transaction.category?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Account</p>
            <p className="font-medium">{transaction.account?.name}</p>
          </div>
          {(transaction.notes || transaction.description) && (
            <div>
              <p className="text-sm text-slate-500">Description</p>
              <p className="font-medium">{transaction.description || transaction.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TransactionDetailModal;

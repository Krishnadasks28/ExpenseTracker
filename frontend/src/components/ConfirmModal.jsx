import { AlertCircle, X } from "lucide-react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText, variant = "danger" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div className={`flex items-center gap-2 ${variant === "danger" ? "text-rose-500" : "text-emerald-500"}`}>
            <AlertCircle size={24} />
            <h2 className="text-xl font-bold">{title || "Confirm Action"}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {message || "Are you sure you want to delete this? This cannot be undone."}
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${variant === "danger" ? "bg-rose-500 hover:bg-rose-600" : "bg-emerald-500 hover:bg-emerald-600"}`}
          >
            {confirmText || (variant === "danger" ? "Delete" : "Confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

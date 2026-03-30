import React from 'react';

const MinimalLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-black w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-emerald-500 animate-spin"></div>
        <p className="text-sm text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default MinimalLoading;

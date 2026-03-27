import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  { text: "Reading your transactions...", limit: 20 },
  { text: "Sorting income and expenses...", limit: 40 },
  { text: "Analyzing spending patterns...", limit: 60 },
  { text: "Comparing income vs expenses...", limit: 80 },
  { text: "Generating insights...", limit: 100 },
];

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [activeMsg, setActiveMsg] = useState(messages[0].text);

  useEffect(() => {
    setProgress(0); // force reset

    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 10));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const earnings = [30, 50, 70, 60, 85];
  const spendingPath = "M0 20 Q50 40 100 60 T200 75 T300 90";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
      {/* CARD */}
      <div className="relative w-80 h-72 bg-neutral-900 rounded-2xl p-6 shadow-xl border border-neutral-800 overflow-hidden">
        {/* TITLE */}
        <p className="text-sm text-neutral-400 mb-4">
          Analyzing your finances...
        </p>

        {/* CHART */}
        <div className="relative h-40">
          {/* EARNINGS */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-full">
            {earnings.map((value, i) => (
              <motion.div
                key={i}
                className="w-7 bg-green-400 rounded-t-md"
                initial={{ height: 0 }}
                animate={{
                  height: `${(progress / 100) * value}%`,
                }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* SPENDING LINE */}
          <svg viewBox="0 0 300 100" className="absolute inset-0 w-full h-full">
            <motion.path
              d={spendingPath}
              fill="transparent"
              stroke="#f87171"
              strokeWidth="3"
              strokeDasharray="400"
              strokeDashoffset="400"
              animate={{
                strokeDashoffset: 400 - (progress / 100) * 400,
              }}
              transition={{ duration: 1 }}
            />
          </svg>
        </div>

        {/* LEGEND */}
        <div className="flex justify-between mt-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-400 rounded-sm" />
            Earnings ↑
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-400 rounded-sm" />
            Spending ↓
          </span>
        </div>

        {/* GLOW */}
        <motion.div
          className="absolute inset-0 bg-green-500/5 rounded-2xl"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* 🔥 DYNAMIC TEXT */}
      <div className="mt-6 h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeMsg}
            className="text-neutral-400 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeMsg}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* PROGRESS */}
      <div className="w-72 h-2 bg-neutral-800 rounded-full mt-3 overflow-hidden">
        <motion.div
          initial={false}
          className="h-full bg-green-400"
          animate={{ width: `${progress}%` }}
        />
      </div>

      <span className="mt-2 text-sm text-neutral-500">{progress}%</span>
    </div>
  );
}

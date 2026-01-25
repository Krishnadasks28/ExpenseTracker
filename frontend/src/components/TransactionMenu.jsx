import { IndianRupee, TrendingDown, TrendingUp } from "lucide-react";

const TransactionMenu = () => {
  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      category: "Food & Dining",
      amount: -85.5,
      date: "2026-01-07",
    },
    {
      id: 2,
      description: "Freelance Project",
      category: "Income",
      amount: 1200.0,
      date: "2026-01-06",
    },
    {
      id: 3,
      description: "Rent Payment",
      category: "Housing",
      amount: -1500.0,
      date: "2026-01-05",
    },
    {
      id: 4,
      description: "Coffee Shop",
      category: "Food",
      amount: -12.5,
      date: "2026-01-05",
    },
    {
      id: 5,
      description: "Gas Station",
      category: "Transport",
      amount: -45.0,
      date: "2026-01-04",
    },
    {
      id: 6,
      description: "Coffee Shop",
      category: "Food",
      amount: -12.5,
      date: "2026-01-05",
    },
    {
      id: 7,
      description: "Gas Station",
      category: "Transport",
      amount: -45.0,
      date: "2026-01-04",
    },
    {
      id: 8,
      description: "Coffee Shop",
      category: "Food",
      amount: -12.5,
      date: "2026-01-05",
    },
    {
      id: 9,
      description: "Gas Station",
      category: "Transport",
      amount: -45.0,
      date: "2026-01-04",
    }
  ];

  return (
    <div className="flex flex-col mt-3 gap-2">
      {recentTransactions &&
        recentTransactions.map((t) => {
          return (
            <div
              key={t.id}
              className="flex justify-between border-0 md:border border-white/30 text-sm lg:text-lg hover:bg-slate-100 hover:border hover:border-slate-200 dark:hover:bg-neutral-900 dark:hover:text-white group rounded-xl py-2 lg:py-4 lg:px-6"
            >
              <div className="flex gap-3 justify-center items-center">
                <div
                  className={`${t.amount > 0 ? "text-emerald-500 bg-emerald-200 " : "text-red-500 bg-red-200 "}flex justify-center items-center h-10 w-10 lg:h-12 lg:w-12 rounded-lg`}
                >
                  {t.amount > 0 ? (
                    <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
                  ) : (
                    <TrendingDown className="h-6 w-6 lg:h-6 lg:w-6" />
                  )}
                </div>
                <div>
                  <h1 className="font-medium">{t.description}</h1>
                  <div className="flex gap-4 mt-1 items-center">
                    <p className="text-xs lg:text-sm items-center px-3 py-1 dark:bg-gray-500/30 bg-slate-200 text-black dark:text-white rounded-2xl dark:group-hover:text-slate-200">
                      {t.category}
                    </p>
                    <span className="text-slate-500 text-xs lg:text-[18px]">Cash</span>
                  </div>
                </div>
              </div>
              <div>
                <h1
                  className={`${t.amount > 0 ? "text-emerald-500" : "text-red-500"} font-semibold text-lg lg:text-2xl`}
                >
                  <IndianRupee size={20} className="inline" />
                  {Math.abs(t.amount)}.00
                </h1>
                <p className=" text-slate-500 dark:group-hover:text-slate-200 text-xs lg:text-lg">
                  {t.date}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TransactionMenu;

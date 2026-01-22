import { TrendingDown, TrendingUp } from "lucide-react";

const TransactionMenu = () => {
  const recentTransactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      category: "Food",
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
  ];

  return (
    <div className="flex flex-col mt-3 gap-2">
      {recentTransactions &&
        recentTransactions.map((t) => {
          return (
            <div
              key={t.id}
              className="flex justify-between text-xl11111 hover:bg-slate-200 dark:hover:bg-neutral-900 dark:hover:text-white group rounded-xl p-3"
            >
              <div className="flex gap-3 justify-center items-center">
                <div
                  className={`${t.amount > 0 ? "text-emerald-500 bg-emerald-200 " : "text-red-500 bg-red-200 "}flex justify-center items-center h-10 w-10 rounded-lg`}
                >
                  {t.amount > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h1>{t.description}</h1>
                  <p className="text-lg text-slate-500 dark:group-hover:text-slate-200">
                    {t.category} • {t.date}
                  </p>
                </div>
              </div>
              <h1
                className={`${t.amount > 0 ? "text-emerald-500" : "text-red-500"} font-semibold`}
              >
                {t.amount > 0 ? "+" : ""}
                {t.amount}
              </h1>
            </div>
          );
        })}
    </div>
  );
};

export default TransactionMenu;

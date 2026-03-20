import { IndianRupee, TrendingDown, TrendingUp } from "lucide-react";

const TransactionMenu = ({ transactions }) => {
  return (
    <div className="flex flex-col mt-3 gap-2">
      {transactions &&
        transactions.map((t) => {
          return (
            <div
              key={t._id}
              className="flex justify-between border-0 md:border border-white/30 text-sm lg:text-lg hover:bg-slate-100 hover:border hover:border-slate-200 dark:hover:bg-neutral-900 dark:hover:text-white group rounded-xl py-2 lg:py-4 lg:px-6"
            >
              <div className="flex gap-3 justify-center items-center">
                <div
                  className={`${t.type === "income" ? "text-emerald-500 bg-emerald-200 " : t.type === "expense" ? "text-red-500 bg-red-200 " : "text-blue-500 bg-blue-200 "}flex justify-center items-center h-10 w-10 lg:h-12 lg:w-12 rounded-lg`}
                >
                  {t.type === "income" ? (
                    <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
                  ) : t.type === "expense" ? (
                    <TrendingDown className="h-6 w-6 lg:h-6 lg:w-6" />
                  ) : (
                    <IndianRupee className="h-6 w-6 lg:h-6 lg:w-6" />
                  )}
                </div>
                <div>
                  <h1 className="font-medium">{t.description}</h1>
                  <div className="flex gap-4 mt-1 items-center">
                    <p className="text-xs lg:text-sm items-center px-3 py-1 dark:bg-gray-500/30 bg-slate-200 text-black dark:text-white rounded-2xl dark:group-hover:text-slate-200">
                      {t.category ? t.category.name : "Contra"}
                    </p>
                    <span className="text-slate-500 text-xs lg:text-[18px]">
                      {t.account
                        ? t.account.name
                        : `${t.fromAccount.name} → ${t.toAccount.name}`}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h1
                  className={`${t.type === "income" ? "text-emerald-500" : t.type === "expense" ? "text-red-500" : "text-blue-500"} font-semibold text-lg lg:text-2xl`}
                >
                  <IndianRupee size={20} className="inline" />
                  {Math.abs(t.amount)}.00
                </h1>
                <p className=" text-slate-500 dark:group-hover:text-slate-200 text-xs lg:text-lg">
                  {new Date(Number(t.date)).toDateString()}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TransactionMenu;

import { X } from "lucide-react";
import CustomSelect from "./ui/CustomSelect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddTransaction = ({ showModel, setShowModel }) => {
  const transactionTypes = ["income", "expense", "contra"];
  const [selectedTransaction, setSelectedTransaction] = useState("income");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("Cash");
  const [fromAccount, setFromAccount] = useState("Cash");
  const [toAccount, setToAccount] = useState("SBI");

  const categories = useSelector((state) => state.category);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    let options = categories
      .filter((c) => c.type === selectedTransaction)
      .map((c) => c.name);
    setCategoryOptions(options);
  }, [selectedTransaction, categories]);

  return (
    <>
      {showModel && (
        <div
          className={`fixed px-2 inset-0 bg-black/40 w-screen h-screen z-50 flex justify-center items-center text-xl `}
        >
          <div className="bg-white dark:bg-[oklch(0.145_0_0)] p-4 md:p-6 rounded-xl w-full lg:w-1/3 animate-scaleIn">
            <div className="flex justify-between">
              <div>
                <h1 className="font-semibold text-xl md:text-2xl">
                  Add Transaction
                </h1>
                <p className="text-gray-400 text-sm md:text-[16px]">
                  Enter the details of your transaction below
                </p>
              </div>
              <div>
                <X
                  className="cursor-pointer dark:hover:bg-[oklch(0.300_0_0)] hover:bg-slate-200"
                  onClick={() => setShowModel(false)}
                />
              </div>
            </div>

            {/* form */}
            <form className="flex flex-col gap-5 mt-5 text-sm md:text-lg ">
              <div className="flex flex-col gap-1">
                <label htmlFor="transactionAmount">Amount</label>

                <input
                  type="number"
                  id="transactionAmount"
                  name="amount"
                  placeholder="0.00"
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-1/2 gap-1">
                  <label htmlFor="expenseType">Type</label>
                  <div>
                    <CustomSelect
                      value={selectedTransaction}
                      onChange={setSelectedTransaction}
                      options={transactionTypes}
                      placeholder="Select transaction type"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-1/2 gap-1">
                  {selectedTransaction === "Contra" ? (
                    <>
                      <label htmlFor="">From</label>
                      <CustomSelect
                        value={fromAccount}
                        onChange={setFromAccount}
                        options={["Cash", "SBI", "BOB"]}
                        placeholder="Select category"
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="category">Category</label>
                      <CustomSelect
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        options={categoryOptions}
                        placeholder="Select category"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {selectedTransaction === "Contra" ? (
                  <>
                    <label>To</label>
                    <CustomSelect
                      value={toAccount}
                      onChange={setToAccount}
                      options={["Cash", "SBI", "BOB"]}
                      placeholder="Select an account..."
                    />
                  </>
                ) : (
                  <>
                    <label>Account</label>
                    <CustomSelect
                      value={selectedAccount}
                      onChange={setSelectedAccount}
                      options={["Cash", "Bank"]}
                      placeholder="Select an account..."
                    />
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400 "
                  placeholder="Add a note (optional)"
                />
              </div>

              <div className="flex gap-4 w-full mt-4">
                <button
                  onClick={() => setShowModel(false)}
                  className="cursor-pointer dark:hover:bg-[oklch(0.200_0_0)] hover:bg-slate-200 border border-slate-300 rounded-xl px-4 py-2 w-1/2"
                >
                  Cancel
                </button>
                {selectedTransaction == "Expense" ? (
                  <button className="cursor-pointer hover:bg-red-600 text-white font-bold bg-red-500 rounded-xl px-4 py-2 w-1/2">
                    Add Expense
                  </button>
                ) : selectedTransaction === "Income" ? (
                  <button className="cursor-pointer hover:bg-emerald-600 text-white font-bold bg-emerald-500 rounded-xl px-4 py-2 w-1/2">
                    Add Income
                  </button>
                ) : (
                  <button className="cursor-pointer hover:bg-emerald-600 text-white font-bold bg-emerald-500 rounded-xl px-4 py-2 w-1/2">
                    Add Transaction
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransaction;

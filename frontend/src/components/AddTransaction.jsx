import { X } from "lucide-react";
import CustomSelect from "./ui/CustomSelect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../api/transactions.api";
import { fetchTransactions } from "../utils/transactions";

const AddTransaction = ({ showModel, setShowModel }) => {
  const transactionTypes = ["income", "expense", "contra"];
  const [selectedTransaction, setSelectedTransaction] = useState("income");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("SBI");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const categories = useSelector((state) => state.category);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const accounts = useSelector((state) => state.accounts);
  const accountNames = accounts.map((a) => a.name);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const accountId = accounts.find((a) => a.name === selectedAccount)?._id;
    const fromAccountId = accounts.find((a) => a.name === fromAccount)?._id;
    const toAccountId = accounts.find((a) => a.name === toAccount)?._id;
    const categoryId = categories.find((c) => c.name === selectedCategory)?._id;
    const transactionData = {
      amount: parseFloat(amount),
      type: selectedTransaction,
      description,
      date,
    };
    if (selectedTransaction === "contra") {
      transactionData.fromAccount = fromAccountId;
      transactionData.toAccount = toAccountId;
    } else {
      transactionData.account = accountId;
      transactionData.category = categoryId;
    }
    const response = await addTransaction(transactionData);
    if (response.ok) {
      // alert transaction added successfully
      alert("Transaction added successfully");
      setAmount("");
      setDescription("");
      setSelectedAccount("");
      setSelectedCategory("");
      setDate(new Date().toISOString().split("T")[0]);
      setFromAccount(""); 
      setToAccount("");
      await fetchTransactions(dispatch);
      setShowModel(false);
    } else {
      // alert error adding transaction
      console.error("Error adding transaction");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!amount || amount <= 0) {
      errors.amount = "Amount must be greater than zero";
    }
    if (!selectedTransaction) {
      errors.transaction = "Transaction type is required";
    }
    if (selectedTransaction !== "contra" && !selectedCategory) {
      errors.category =
        "Category is required for income and expense transactions";
    }
    if (selectedTransaction === "contra") {
      if (!fromAccount) {
        errors.fromAccount = "From account is required for contra transactions";
      }
      if (!toAccount) {
        errors.toAccount = "To account is required for contra transactions";
      }
    } else {
      if (!selectedAccount) {
        errors.account =
          "Account is required for income and expense transactions";
      }
    }
    if (!description) {
      errors.description = "Description is required";
    }
    return errors;
  };

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
                {errors.amount && (
                  <p className="text-red-600 text-sm">{errors.amount}</p>
                )}
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  id="transactionAmount"
                  name="amount"
                  placeholder="0.00"
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-1/2 gap-1">
                  <label htmlFor="expenseType">Type</label>
                  {errors.transaction && (
                    <p className="text-red-600 text-sm">{errors.transaction}</p>
                  )}
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
                  {selectedTransaction === "contra" ? (
                    <>
                      <label htmlFor="">From</label>
                      {errors.fromAccount && (
                        <p className="text-red-600 text-sm">
                          {errors.fromAccount}
                        </p>
                      )}
                      <CustomSelect
                        value={fromAccount}
                        onChange={setFromAccount}
                        options={accountNames}
                        placeholder="Select category"
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="category">Category</label>
                      {errors.category && (
                        <p className="text-red-600 text-sm">
                          {errors.category}
                        </p>
                      )}
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
                {selectedTransaction === "contra" ? (
                  <>
                    <label>To</label>
                    {errors.toAccount && (
                      <p className="text-red-600 text-sm">{errors.toAccount}</p>
                    )}
                    <CustomSelect
                      value={toAccount}
                      onChange={setToAccount}
                      options={accountNames}
                      placeholder="Select an account..."
                    />
                  </>
                ) : (
                  <>
                    <label>Account</label>
                    {errors.account && (
                      <p className="text-red-600 text-sm">{errors.account}</p>
                    )}
                    <CustomSelect
                      value={selectedAccount}
                      onChange={setSelectedAccount}
                      options={accountNames}
                      placeholder="Select an account..."
                    />
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="date">Date</label>
                {errors.date && (
                  <p className="text-red-600 text-sm">{errors.date}</p>
                )}
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description">Description</label>
                {errors.description && (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                )}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer hover:bg-red-600 text-white font-bold bg-red-500 rounded-xl px-4 py-2 w-1/2"
                  >
                    Add Expense
                  </button>
                ) : selectedTransaction === "Income" ? (
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer hover:bg-emerald-600 text-white font-bold bg-emerald-500 rounded-xl px-4 py-2 w-1/2"
                  >
                    Add Income
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer hover:bg-emerald-600 text-white font-bold bg-emerald-500 rounded-xl px-4 py-2 w-1/2"
                  >
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

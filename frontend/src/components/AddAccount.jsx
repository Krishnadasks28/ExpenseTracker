import { X } from "lucide-react";
import CustomSelect from "./ui/CustomSelect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAccount } from "../api/accounts.api";
import { setAccounts } from "../redux/slices/accountsSlice";
import { accountQuery, getData } from "../api/queries";

const AddAccount = ({ showModel, setShowModel }) => {
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState(0);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({ name: "", balance: "", notes: "" });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateForm();

    if (Object.keys(err).length === 0) {
      const data = {
        name: accountName,
        balance,
        notes,
      };
      const res = await addNewAccount(data);
      if (res.ok) {
        setAccountName("");
        setBalance(0);
        setNotes("");
        const data = await res.json();
        try {
          const res = await getData(accountQuery);
          const data = await res.json();
          if (data?.data?.accounts) {
            dispatch(setAccounts(data.data.accounts));
          }
        } catch (err) {
          console.error(err);
        }
        // alert account added
        setShowModel(false);
      } else {
        const response = await res.json();
      }
    } else {
      console.log(err);
      setErrors(err);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate account name
    if (!accountName.trim()) {
      errors.name = "Account name is required";
    } else if (accountName.trim().length < 3) {
      errors.name = "Account name must be at least 3 characters";
    } else if (accountName.trim().length > 50) {
      errors.name = "Account name must not exceed 50 characters";
    }

    // Validate balance
    if (balance === "" || balance === null) {
      errors.balance = "Balance is required";
    } else if (isNaN(balance)) {
      errors.balance = "Balance must be a number";
    } else if (balance < 0) {
      errors.balance = "Balance cannot be negative";
    }

    // Validate notes (optional field)
    if (notes && notes.length > 500) {
      errors.notes = "Notes must not exceed 500 characters";
    }

    return errors;
  };

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
                  Add Account
                </h1>
                <p className="text-gray-400 text-sm md:text-[16px]">
                  Add and track your financial account in one place.
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
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
                <label htmlFor="account">Account Name</label>
                <input
                  id="account"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter bank name"
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                {errors.balance && (
                  <p className="text-red-600 text-sm mt-2">{errors.balance}</p>
                )}
                <label htmlFor="balance">Balance</label>

                <input
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  type="number"
                  id="balance"
                  name="balance"
                  placeholder="0.00"
                  className="dark:bg-[oklch(0.200_0_0)] rounded-xl bg-slate-100 p-2 focus:outline-0 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                {errors.notes && (
                  <p className="text-red-600 text-sm mt-2">{errors.notes}</p>
                )}
                <label htmlFor="notes">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  id="notes"
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

                <button
                  onClick={handleSubmit}
                  className="cursor-pointer hover:bg-emerald-600 text-white font-bold bg-emerald-500 rounded-xl px-4 py-2 w-1/2"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAccount;

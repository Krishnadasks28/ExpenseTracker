import asyncHandler from "../middlewares/asyncHandler.js";
import transaction from "../models/transaction.model.js";
import userAccount from "../models/account.model.js";
// list all expenses limit=40
export const getTransactions = asyncHandler(async (req, res) => {
  const { type, page } = req.query;
  const filter = {
    user: req.userId,
  };
  if (type) {
    filter.type = type;
  }
  const allExpenses = await transaction
    .find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * 20)
    .limit(40);

  res.status(200).json(allExpenses);
});

// add a transaction
export const addTransaction = asyncHandler(async (req, res) => {
  const {
    amount,
    type,
    category,
    account,
    description,
    date,
    fromAccount,
    toAccount,
  } = req.body;

  const payload = {
    amount,
    type,
    category,
    account,
    fromAccount,
    toAccount,
    description,
    user: req.userId,
    date,
  };

  const expense = await transaction.create(payload);
  // adjust the account balances based on the transaction type
  if (type === "contra") {
    await Promise.all([
      userAccount.findByIdAndUpdate(fromAccount, {
        $inc: { balance: -amount },
      }),
      userAccount.findByIdAndUpdate(toAccount, { $inc: { balance: amount } }),
    ]);
  } else if (type === "income") {
    await userAccount.findByIdAndUpdate(account, { $inc: { balance: amount } });
  } else if (type === "expense") {
    await userAccount.findByIdAndUpdate(account, {
      $inc: { balance: -amount },
    });
  }

  res.status(200).json(expense);
});

// delete transaction
export const deleteTransaction = asyncHandler(async (req, res) => {
  const transactionToDelete = await transaction.findById(req.params.id);
  if (!transactionToDelete) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  const { type, amount, account, fromAccount, toAccount } = transactionToDelete;

  // Reverse the account balances based on the transaction type
  if (type === "contra") {
    await Promise.all([
      userAccount.findByIdAndUpdate(fromAccount, {
        $inc: { balance: amount },
      }),
      userAccount.findByIdAndUpdate(toAccount, { $inc: { balance: -amount } }),
    ]);
  } else if (type === "income") {
    await userAccount.findByIdAndUpdate(account, { $inc: { balance: -amount } });
  } else if (type === "expense") {
    await userAccount.findByIdAndUpdate(account, {
      $inc: { balance: amount },
    });
  }

  await transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "expense removed" });
});

// update an expense transaction
export const updateTransaction = asyncHandler(async (req, res) => {
  const oldTransaction = await transaction.findById(req.params.id);
  if (!oldTransaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // 1. Reverse the old transaction's balance effect
  const {
    type: oldType,
    amount: oldAmount,
    account: oldAccount,
    fromAccount: oldFrom,
    toAccount: oldTo,
  } = oldTransaction;

  if (oldType === "contra") {
    await Promise.all([
      userAccount.findByIdAndUpdate(oldFrom, { $inc: { balance: oldAmount } }),
      userAccount.findByIdAndUpdate(oldTo, { $inc: { balance: -oldAmount } }),
    ]);
  } else if (oldType === "income") {
    await userAccount.findByIdAndUpdate(oldAccount, {
      $inc: { balance: -oldAmount },
    });
  } else if (oldType === "expense") {
    await userAccount.findByIdAndUpdate(oldAccount, {
      $inc: { balance: oldAmount },
    });
  }

  // 2. Update the transaction
  const updatedTransaction = await transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  // 3. Apply the new transaction's balance effect
  const {
    type: newType,
    amount: newAmount,
    account: newAccount,
    fromAccount: newFrom,
    toAccount: newTo,
  } = updatedTransaction;

  if (newType === "contra") {
    await Promise.all([
      userAccount.findByIdAndUpdate(newFrom, { $inc: { balance: -newAmount } }),
      userAccount.findByIdAndUpdate(newTo, { $inc: { balance: newAmount } }),
    ]);
  } else if (newType === "income") {
    await userAccount.findByIdAndUpdate(newAccount, {
      $inc: { balance: newAmount },
    });
  } else if (newType === "expense") {
    await userAccount.findByIdAndUpdate(newAccount, {
      $inc: { balance: -newAmount },
    });
  }

  res.status(200).json(updatedTransaction);
});

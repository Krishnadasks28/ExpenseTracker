export const addTransaction = async (transactionData) => {
  return fetch("/api/transaction/addTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(transactionData),
  });
};

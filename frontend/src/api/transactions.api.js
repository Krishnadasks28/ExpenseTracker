const API = import.meta.env.VITE_API_URL;

export const addTransaction = async (transactionData) => {
  return fetch(`${API}/api/transaction/addTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(transactionData),
  });
};

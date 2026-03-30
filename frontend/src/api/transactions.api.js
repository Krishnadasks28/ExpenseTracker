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

export const deleteTransaction = async (transactionId) => {
  return fetch(`${API}/api/transaction/deleteTransaction/${transactionId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const updateTransaction = async (transactionId, transactionData) => {
  return fetch(`${API}/api/transaction/updateTransaction/${transactionId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(transactionData),
  });
};

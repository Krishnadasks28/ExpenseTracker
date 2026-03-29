const API = import.meta.env.VITE_API_URL;

export const addNewAccount = async (data) => {
  return fetch(`${API}/api/account/addNewAccount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

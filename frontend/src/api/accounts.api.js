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

export const updateAccount = async (id, data) => {
  return fetch(`${API}/api/account/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const deleteAccount = async (id) => {
  return fetch(`${API}/api/account/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

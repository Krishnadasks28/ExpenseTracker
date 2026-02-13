export const addNewAccount = async (data) => {
  return fetch("/api/account/addNewAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const createUser = (id) => {
  return fetch("/api/auth/createUser", {
    method: "POST",
    headers: {
      authorization: `Bearer ${id}`,
    },
    credentials: "include",
  });
};

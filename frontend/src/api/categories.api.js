export const getCategories = async () => {
  return fetch("/api/category/getCategories", {
    method: "GET",
    credentials: "include",
  });
};

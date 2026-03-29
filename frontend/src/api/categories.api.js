const API = import.meta.env.VITE_API_URL;
export const getCategories = async () => {
  return fetch(`${API}/api/category/getCategories`, {
    method: "GET",
    credentials: "include",
  });
};

export const createCategory = async (categoryData) => {
  return fetch(`${API}/api/category/createCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(categoryData),
  });
};

export const deleteCategory = async (categoryId) => {
  return fetch(`${API}/api/category/deleteCategory/${categoryId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

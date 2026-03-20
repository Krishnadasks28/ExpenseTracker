export const getCategories = async () => {
  return fetch("/api/category/getCategories", {
    method: "GET",
    credentials: "include",
  });
};

export const createCategory = async (categoryData) => {
  return fetch("/api/category/createCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(categoryData),
  });
};

export const deleteCategory = async (categoryId) => {
  return fetch(`/api/category/deleteCategory/${categoryId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

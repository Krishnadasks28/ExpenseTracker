export const accountQuery = `
    query {
        accounts {
            name
            balance
            notes
        }
    }
`;

export const getData = async (query) => {
  return fetch("/graphql", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
};

export const accountQuery = `
    query {
        accounts {
            _id
            name
            balance
            notes
        }
    }
`;

export const categoryQuery = `
    query {
        categories {
            _id
            name
            type
            icon
        }
    }
`;

export const transactionQuery = `
    query {
        transactions {
            _id
            amount
            date
            description
            type
            category {
                name
            }
            account {
                _id
                name
            }
            fromAccount {
                _id
                name
            }
            toAccount {
                _id
                name
            }
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

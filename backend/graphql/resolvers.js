import account from "../models/account.model.js";

export const resolvers = {
  Query: {
    accounts: async (_, __, { userId }) => {
      return await account.find({ user: userId });
    },
  },
};

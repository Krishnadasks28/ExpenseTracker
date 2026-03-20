import account from "../models/account.model.js";
import category from "../models/category.model.js";
import transaction from "../models/transaction.model.js";

export const resolvers = {
  Query: {
    accounts: async (_, __, { userId }) => {
      return await account.find({ user: userId });
    },
    categories: async (_, __, { userId }) => {
      return await category.find({ user: userId });
    },
    transactions: async (_, __, { userId }) => {
      return await transaction
        .find({ user: userId })
        .populate("account")
        .populate("category")
        .populate("fromAccount")
        .populate("toAccount");
    },
  },
};

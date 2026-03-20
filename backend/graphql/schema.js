export const typeDefs = `#graphql
type Account{
    _id: ID,
    name:String,
    balance:Int,
    notes:String
}

type Category{
    _id: ID,
    name:String,
    type:String,
    icon:String
}

type Transaction{
    _id: ID,
    amount:Int,
    date:String,
    description:String,
    account:Account,
    category:Category,
    type:String,
    fromAccount:Account,
    toAccount:Account
}

type Query{
    accounts: [Account],
    categories: [Category],
    transactions: [Transaction]
}
`;

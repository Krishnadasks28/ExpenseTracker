export const typeDefs = `#graphql
type Account{
    name:String,
    balance:Int,
    notes:String
}

type Query{
    accounts: [Account]
}
`;

export const schema = gql`
  type Wallet {
    status: String
    address: String
  }

  type Query {
    subscription(id: String!): Wallet @skipAuth
  }
`

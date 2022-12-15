export const schema = gql`
  type User {
    id: String!
    created_at: DateTime
    roles: String
    auth_user_id: String
    crypto_wallet_address: String
    Project: [Project]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
    userList(id: String!): [User!]! @requireAuth
  }

  input CreateUserInput {
    created_at: DateTime
    roles: String
    auth_user_id: String
    crypto_wallet_address: String
  }

  input UpdateUserInput {
    created_at: DateTime
    roles: String
    auth_user_id: String
    crypto_wallet_address: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`

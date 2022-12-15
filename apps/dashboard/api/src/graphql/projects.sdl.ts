export const schema = gql`
  type Project {
    id: String!
    name: String
    description: String
    created_at: DateTime
    updated_at: DateTime
    user_id: String
    User: User
    Nftoupon: [Nftoupon]!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: String!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String
    description: String
    created_at: DateTime
    updated_at: DateTime
    user_id: String
  }

  input UpdateProjectInput {
    name: String
    description: String
    created_at: DateTime
    updated_at: DateTime
    user_id: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: String!, input: UpdateProjectInput!): Project!
      @requireAuth
    deleteProject(id: String!): Project! @requireAuth
  }
`

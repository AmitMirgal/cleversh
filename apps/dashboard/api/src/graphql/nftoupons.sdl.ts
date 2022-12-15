export const schema = gql`
  type Nftoupon {
    id: Int!
    name: String
    description: String
    project_id: String!
    imageUrl: String
    status: String
    offer: String
    tokenId: String
    tokenOfferIndex: String
    created_at: DateTime
    creator_wallet_address: String
    Project: Project!
  }

  type Query {
    nftoupons: [Nftoupon!]! @requireAuth
    nftoupon(id: Int!): Nftoupon @requireAuth
  }

  input CreateNftouponInput {
    name: String
    description: String
    project_id: String!
    imageUrl: String
    status: String
    offer: String
    tokenId: String
    tokenOfferIndex: String
    created_at: DateTime
    creator_wallet_address: String
  }

  input UpdateNftouponInput {
    name: String
    description: String
    project_id: String
    imageUrl: String
    status: String
    offer: String
    tokenId: String
    tokenOfferIndex: String
    created_at: DateTime
    creator_wallet_address: String
  }

  type Mutation {
    createNftoupon(input: CreateNftouponInput!): Nftoupon! @requireAuth
    updateNftoupon(id: Int!, input: UpdateNftouponInput!): Nftoupon!
      @requireAuth
    deleteNftoupon(id: Int!): Nftoupon! @requireAuth
  }
`

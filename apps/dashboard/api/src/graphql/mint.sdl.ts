export const schema = gql`
  type Refs {
    qr_png: String!
    websocket_status: String!
  }

  type Payload {
    uuid: String!
    refs: Refs
    imageUrl: String!
  }

  type Mint {
    payload: Payload
  }

  type Query {
    mint(address: String!, file: String!, description: String!): Mint @skipAuth
  }
`

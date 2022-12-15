export const schema = gql`
  type Refs {
    qr_png: String!
    websocket_status: String!
  }

  type ConnectPayload {
    uuid: String!
    refs: Refs
  }

  type Query {
    connect: ConnectPayload @skipAuth
  }
`

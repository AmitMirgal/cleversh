const Connect = `
query {
  connect {
    uuid
    refs {
      qr_png
    }
  }
}
`;

const Subscription = `
query subscription($id: String!){
  subscription(id: $id) {
    status
    address
  }
}
`;
export { Connect, Subscription };

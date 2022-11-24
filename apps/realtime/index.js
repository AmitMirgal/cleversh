import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const pubSub = createPubSub();

// Provide your schema
const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }

      type Subscription {
        randomNumber: Float!
      }

      type Mutation {
        broadcastRandomNumber: Boolean
      }
    `,
    resolvers: {
      Query: {
        hello: () => "world",
      },
      Subscription: {
        randomNumber: {
          // subscribe to the randomNumber event
          subscribe: () => pubSub.subscribe("randomNumber"),
          resolve: (payload) => payload,
        },
      },
      Mutation: {
        broadcastRandomNumber: (_, args) => {
          // publish a random number
          pubSub.publish("randomNumber", Math.random());

          return true;
        },
      },
    },
  }),
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});

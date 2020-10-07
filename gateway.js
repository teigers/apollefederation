const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { buildFederatedSchema } = require('@apollo/federation');
const { cats } = require('./database');
const  fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const typeDefs = gql(`${fs.readFileSync('./schema/catsSchema.graphql')}`);

const resolvers = {
  Query: {
    cats: () => cats,
  },

  Cat: {
    __resolveReference: (cat, _) => cats.find(it => it.id === cat.id),
    owner: obj => ({ __typename: 'Person', id: obj.ownerId }),
  },
};

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    console.log('Cats received authorization header:', req.headers.authorization);
  },
});

const gateway = new ApolloServer({
  gateway: new ApolloGateway({
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          console.log(`${name}: ${url}`);
          request.http.headers.set('authorization', `${context.authorization}`);
        },
      });
    },
  }),
  context: ({ req }) => ({ authorization: req.headers.authorization }),
  subscriptions: false,
});

const bootStrap = async () => {
  await server.listen({ port: 6060 }).then(({ url }) => {
    console.log(`Cat service running at ${url}`);
  });

  await gateway.listen({ port: 7070 }).then(({ url }) => {
    console.log(`Gateway running at ${url}`);
  });
};

bootStrap();


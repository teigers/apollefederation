const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { buildFederatedSchema } = require('@apollo/federation');
const { cats } = require('./database');

const typeDefs = gql`
  type Query {
    cats: [Cat]!
  }

  type Cat @key(fields: "id") {
    id: String!
    name: String!
    owner: Person!
  }

  extend type Person @key(fields: "id") {
    id: String! @external
  }
`;

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
});

const gateway = new ApolloServer({
    gateway: new ApolloGateway({ 
      serviceList: [
      { name: 'messages', url: 'http://localhost:4000' },
      { name: 'persons', url: 'http://localhost:5000' },
      { name: 'cats', url: 'http://localhost:6060' },
    ],
  }),
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


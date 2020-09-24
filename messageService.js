const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { messages } = require('./database');

const typeDefs = gql`
  type Query {
    messages: [Message]!
  }

  type Message @key(fields: "id") {
      id: String!
      message: String!
      author: Person!
  }

  extend type Person @key(fields: "id") {
    id: String! @external
  }
`;

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Message: {
    __resolveReference: (message, _) => messages.find(it => it.id === message.id),
    author: obj => ({ __typename: "Message", id: obj.personId }),
  },
};

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({ schema });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Message service running at ${url}`);
});

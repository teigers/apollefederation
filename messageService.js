const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { messages } = require('./database');
const  fs = require('fs');

const typeDefs = gql(`${fs.readFileSync('./schema/messageSchema.graphql')}`);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Message: {
    __resolveReference: (message, _) => messages.find(it => it.id === message.id),
    author: obj => ({ __typename: "Person", id: obj.personId }),
  },
};

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({ schema });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Message service running at ${url}`);
});

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { persons } = require('./database');

const typeDefs = gql`
  type Query {
    persons: [Person]!
  }

  type Person @key(fields: "id") {
    id: String!
    name: String!
    cat: Cat
    messages: [Message]!
  }

  extend type Cat @key(fields: "id") {
    id: String! @external
  }

  extend type Message @key(fields: "id") {
    id: String! @external
  }
`;

const resolvers = {
  Query: {
    persons: () => persons,
  },

  Person: {
    __resolveReference: (person, _) => persons.find(it => it.id === person.id),
    cat: obj => ({ __typename: 'Cat', id: obj.catId }),
    messages: obj => obj.messageIds.map(id => ({ __typename: 'Message', id })),
  },
};

const schema = buildFederatedSchema([{ typeDefs, resolvers }]);

const server = new ApolloServer({ schema });

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`Person service running at ${url}`);
});

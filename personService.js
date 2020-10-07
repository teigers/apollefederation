const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { persons } = require('./database');
const  fs = require('fs');

const typeDefs = gql(`${fs.readFileSync('./schema/personSchema.graphql')}`);

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

const server = new ApolloServer({ 
  schema,
  context: ({ req }) => {
    console.log('Person service received authorization header:', req.headers.authorization);
  },
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`Person service running at ${url}`);
});

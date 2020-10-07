## Apollo managed federation test

### Install

```bash
yarn
```

Create a free [Apollo Studio account](https://studio.apollographql.com/login) to get an API key. 

### Usage

Deploy schemas to Apollo Studio. (Note: An unknown type warning may occur without anything actually beeing wrong).

```bash
yarn deploy-schema KEY VARIANT
```

The KEY is the Apollo Studio API KEY for the graph and VARIANT is just that, e.g. development. These can be found in Apollo Studio after creating a graph.

The following environment variables must be set.
```bash
APOLLO_KEY
APOLLO_GRAPH_VARIANT
```

After deploying the schemas start the services and the gateway.

```bash
yarn nodemon messageService
yarn nodemon personService
yarn nodemon gateway

```

Test queries in the playground at http://localhost:7070/
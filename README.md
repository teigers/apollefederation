## Apollo managed federation test

### Install

```bash
yarn
```

Create a free [Apollo Studio account](https://studio.apollographql.com/login) and a graph to get an API key. 

### Usage

Deploy schemas to Apollo Studio. (Note: An unknown type warning/error may occur without anything actually beeing wrong).

```bash
yarn deploy-schema API_KEY VARIANT GRAPH_NAME
```

The API_KEY is the Apollo Studio API KEY for the graph, VARIANT is just that (or an environment), e.g. development, and the GRAPH_NAME is the
name given to the graph in Apollo Studio.

The following environment variables must be set in e.g. a .env file.

```bash
APOLLO_KEY
APOLLO_GRAPH_VARIANT
```

After deploying the schemas and setting the env variables - start the services and the gateway.

```bash
yarn nodemon messageService
yarn nodemon personService
yarn nodemon gateway

```

Test queries in the playground at http://localhost:7070/
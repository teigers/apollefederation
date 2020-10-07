yarn apollo service:push \
    --graph=$3 \
    --key=$1 \
    --variant=$2 \
    --serviceName=cats \
    --serviceURL=http://localhost:6060/graphql \
    --localSchemaFile=./schema/catsSchema.graphql
yarn apollo service:push \
    --graph=Catalina \
    --key=$1 \
    --variant=$2 \
    --serviceName=cats \
    --serviceURL=http://localhost:6060/graphql \
    --localSchemaFile=./schema/catsSchema.graphql
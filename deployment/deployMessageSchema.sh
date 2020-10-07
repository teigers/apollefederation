yarn apollo service:push \
    --graph=Catalina \
    --key=$1 \
    --variant=$2 \
    --serviceName=messages \
    --serviceURL=http://localhost:4000/graphql \
    --localSchemaFile=./schema/messageSchema.graphql 
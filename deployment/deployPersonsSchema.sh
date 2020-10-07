yarn apollo service:push \
    --graph=Catalina \
    --key=$1 \
    --variant=$2 \
    --serviceName=persons \
    --serviceURL=http://localhost:5000/graphql \
    --localSchemaFile=./schema/personSchema.graphql 

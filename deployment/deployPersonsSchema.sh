yarn apollo service:push \
    --graph=$3 \
    --key=$1 \
    --variant=$2 \
    --serviceName=persons \
    --serviceURL=http://localhost:5000/graphql \
    --localSchemaFile=./schema/personSchema.graphql 

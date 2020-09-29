yarn apollo service:push \
    --graph=Catalina \
    --key=service:Catalina:BS3e20vrDo6fiD7ZGlzH1Q \
    --variant=current \
    --serviceName=cats \
    --serviceURL=http://localhost:6060/graphql \
    --localSchemaFile=./schema/catsSchema.graphql


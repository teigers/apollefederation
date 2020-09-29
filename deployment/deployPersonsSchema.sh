yarn apollo service:push \
    --graph=Catalina \
    --key=service:Catalina:BS3e20vrDo6fiD7ZGlzH1Q \
    --variant=current \
    --serviceName=persons \
    --serviceURL=http://localhost:5000/graphql \
    --localSchemaFile=./schema/personSchema.graphql 


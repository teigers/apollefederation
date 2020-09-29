yarn apollo service:push \
    --graph=Catalina \
    --key=service:Catalina:BS3e20vrDo6fiD7ZGlzH1Q \
    --variant=current \
    --serviceName=messages \
    --serviceURL=http://localhost:4000/graphql \
    --localSchemaFile=./schema/messageSchema.graphql 

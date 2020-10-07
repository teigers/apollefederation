if [ -z "$3" ]
then
    echo "Usage: $0 KEY VARIANT"
    echo "API_KEY - Apollo Studio API key"
    echo "VARIANT - The graph variant"
    echo "GRAPH_NAME - The name of the graph"
    exit
fi

./deployment/deployPersonsSchema.sh $1 $2 $3
./deployment/deployMessageSchema.sh $1 $2 $3
./deployment/deployCatsSchema.sh $1 $2 $3
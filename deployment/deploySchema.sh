if [ -z "$2" ]
then
    echo "Usage: $0 KEY VARIANT"
    echo "KEY - Apollo Studio API key"
    echo "VARIANT - graph variant"
    exit
fi

./deployment/deployPersonsSchema.sh $1 $2
./deployment/deployMessageSchema.sh $1 $2
./deployment/deployCatsSchema.sh $1 $2
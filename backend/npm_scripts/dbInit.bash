#!/bin/bash
if [ "$NODE_ENV" = "dev" ]
then
    echo "Initializing DB"
    echo "Building Container"
    echo "Stop/Rm if currently running..."
    docker stop db || true && docker rm db || true
    echo "Starting Local DB Container"
    docker run --name db -p 5432:5432 -e POSTGRES_USER=localuser -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=devdb -d postgres:9.6.3
    sleep 5
    echo "Running Migrations"
    npm run migrations
    
elif [ "$NODE_ENV" = "prod" ]
then
    echo "Nothing configured for prod"

else
    echo "Please set NODE_ENV to dev or prod."

fi
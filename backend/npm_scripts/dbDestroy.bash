#!/bin/bash
if [ "$NODE_ENV" = "dev" ]
then
    docker stop db
    docker rm db

else
    echo "db-destroy is not supported for non-dev environments."

fi
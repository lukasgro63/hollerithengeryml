#!/bin/bash
if [ "$CI_COMMIT_REF_NAME" == "main" ]; then 
    export ENVIRONMENT="prod"
    export DOCKER_COMPOSE_FILE="docker-compose.yml -f docker-compose.prod.yml"
elif [ "$CI_COMMIT_REF_NAME" == "test" ]; then
    export ENVIRONMENT="test"
    export DOCKER_COMPOSE_FILE="docker-compose.yml"
else
    export ENVIRONMENT="dev"
    export DOCKER_COMPOSE_FILE="docker-compose.yml"
fi

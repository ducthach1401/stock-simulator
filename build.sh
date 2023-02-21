#!/bin/bash

version=$(jq -r .version package.json)
name=$(jq -r .name package.json)

npm run build

docker login --username=$DOCKER_USER --password=$DOCKER_PASS
docker build --pull --rm -f "Dockerfile" -t ducthach1401/${name}:${version} "."
docker push ducthach1401/${name}:${version}

#!/bin/bash

cp * ./deploy

cd deploy
npm run build

rm -rf src docker test node_modules

docker build --pull --rm -f "Dockerfile" -t ducthach1401/stock-simulator:0.0.1 "."
docker push ducthach1401/stock-simulator:0.0.1
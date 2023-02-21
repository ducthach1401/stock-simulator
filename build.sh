#!/bin/bash

npm run build

docker build --pull --rm -f "Dockerfile" -t ducthach1401/stock-simulator:0.0.1 "."
docker push ducthach1401/stock-simulator:0.0.1
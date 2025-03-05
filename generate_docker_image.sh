#!/bin/bash

VERSION=$(cat version)

docker build -t api-gateway:$VERSION .
docker tag api-gateway:$VERSION api-gateway:latest

echo "Docker image api-gateway:$VERSION has been created successfully"
#!/bin/bash

componentName=message-service
version=latest

docker build -t $componentName:$version .

kubectl delete -f message-service.yml
kubectl apply -f message-service.yml
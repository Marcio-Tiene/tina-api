#!/bin/bash
POSTGRES_USER=$(grep POSTGRES_USER .env | cut -d '=' -f2)
cd "$(dirname "$0")"
docker network create $POSTGRES_USER
#!/bin/bash

echo "Creating environment variables"
sh /usr/share/nginx/html/env.sh

echo "Executing entrypoint"
sh /docker-entrypoint.sh "$@"
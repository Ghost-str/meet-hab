#!/bin/bash

imageIds=$(docker images -f "label=com.docker.compose.project=meet-hub" -f "dangling=false" --format "{{.ID}} {{.Repository}} {{.Tag}}")

for line in $imageIds; do
    dockerId=$(echo "$line" | awk '{print $1}')
    repository=$(echo "$line" | awk '{print $2}')
    tag=$(echo "$line" | awk '{print $3}')

    echo "processing container with id: $dockerId"
    docker save "$dockerId" | bzip2 | ssh server 'bunzip2 | docker load'
    echo "tagging image as $repository:$tag"
    ssh server "docker tag $dockerId $repository:$tag"
done

DOCKER_HOST="ssh://server" docker compose -f docker-compose up -d --remove-orphans
DOCKER_HOST="ssh://server" docker system prune -f -a

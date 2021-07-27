## Container

Container is a running process that can talk to a segment of resources, its own memory subspace scoped by the container

## Docker image

- Docker image is a bundled snapshot of all the files that should be available to a programm running inside a container.
- Each image has a default command, which is executed by `docker run <image-name>`
- The command can be overriden by running `docker run <image-name> <command>`

## Manipulate containers

- START UP stopped container `docker start`. Using `-a` to attach stdout and forward signals
- GET LOGS: `docker logs <container-id>`
- STOP: `docker stop <container-id>` (Sending SIGTERM to the process running inside container)
- EXECUTE COMMAND: `docker exec <container-id> <command>`. `-i` to attach STDIN. `-t` to get container look like a terminal connection session
- BUILD WITH FILE: `docker build -f <file-name>`

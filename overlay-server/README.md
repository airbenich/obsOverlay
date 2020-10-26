# Presentation Server

**The Presentation Server manages communication between different presentation softwares with socket.io.**

All other application must connect to this server via HOST and PORT (3000).

## To Use

Clone this repository and run from your command line:

```bash
# Go into the repository
cd presentation-server
# Install dependencies and run the app
npm install && npm start
```

## Deploy as docker container
Build docker image from Dockerfile:

`docker build -t overlay-server ./`

Show all docker images:

`docker images`

Save docker image to file:

`docker save -o ../overlay-server.tar overlay-server`

### Deploy to docker host machine (e.g. Synology NAS)
* Transfer file to docker host machine
* stop old container
* remove old image
* add new image
* start image as container and route port 3000 and 62000 in port settings

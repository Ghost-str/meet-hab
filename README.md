Meet-hub
--------

Meet-hub is a place for you to make friends for a good time.

Development
-----------
1. [install `docker` and `docker-compose`](https://docs.docker.com/get-docker/) on your machine
2. install nvm or from node site
3. install npm dependencies `cd src && npm install`
4. run dev environment `docker-compose up -d`

Notes
-----
- to show logs from container use `docker-compose logs -f [container-name]` command
- to run database migration use `docker-compose exec backend npm run migrate` command
- to run seeds use `docker-compose exec backend npm run seeds` command



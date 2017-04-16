# rethinkdb-node-middleware
generic RethinkDB CRUD methods for nodejs apis

# running tests
1. You need a docker machine running locally.
2. Start a rethinkdb image locally in detached mode:
`docker run -d -p 8080:8080 -p 28015:28015 rethinkdb`
This exposes 28015 for the RethnkDB api, and 8080 to access it in the browser at `192.168.99.100:8080` if u want to see test results

2. run `npm install`
3. run `npm test`

run server locally:
"C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath c:\mongodb\data


why "NODE_ENV=development node app.js" in script doesn't get read properly?
in stall win-node-env globally
npm install -g win-node-env
then in the config variable use this function
```javascript

require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});

```


for Jest test,
file name has to be in the format [name].test.js


## Config Set Up
local
MONGODB_URI=mongodb://localhost:27017/BettingGameDB?retryWrites=true&w=majority
JWT_SECRET=
PORT=8080

in production:
MONGODB_URI=mongodb+srv://<USERID>:<password>@bettinggamedb.tdq5m.mongodb.net/<DB>?retryWrites=true&w=majority


socketio
use
io.sockets.emit('update') to send emit event to all connected client.


issue found
jest test have issue with EADDRINUSE: address already in use
solution: https://stackoverflow.com/questions/60804299/how-to-solve-listen-eaddrinuse-address-already-in-use-in-integration-tests
Supertest is able to manage the setup/teardown of an express/koa app itself if you can import an instance of app without calling .listen() on it.

which mean we don't import the app that call the .listen method. just call the server instance.

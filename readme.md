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

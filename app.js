const server = require('./server');
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});
const port = process.env.PORT;

server.listen(port, () => console.log('App is up and running at port ' + port));

module.exports = server;
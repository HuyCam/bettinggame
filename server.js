
require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const { saladGame } = require('./game-util/salad');
const app = express();
const auth = require('./middlewares/auth');


const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(cors());

saladGame.initiateGame();
const timeInterval = 35 * 1000;
setInterval(function() {
    console.log("Lucky Draw starting");
    let result = saladGame.draw();
    console.log("result " + result);
  }, timeInterval);

// import routers
const UserRouter = require('./routes/user');
// use router
app.use(UserRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/bet', auth, async (req, res) => {
  const user = await req.user.toJSON();
  if (saladGame.allowBet) {
    res.send('you can bet');
  } else {
    res.send('you can not bet');
  }
})

io.on('connection', (socket) => {

  socket.on('join', (data) => {
    console.log(data);
  })
  socket.on('disconnect', () => {
    console.log('client disconnected from server');
  })
})



module.exports = server;
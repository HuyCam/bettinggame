
require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const salad = require('./game-util/salad');
const app = express();
const port = process.env.PORT || 3000;


const cors = require('cors');

const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(cors());

// import routers
const UserRouter = require('./routes/user');
// use router
app.use(UserRouter);



// setInterval(function() {
//   console.log("Lucky Draw starting");
//   let result = salad.saladGame.draw();
//   console.log("result " + result);
// }, the_interval);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  socket.on('join', (data) => {
    console.log(data);
  })
  socket.on('disconnect', () => {
    console.log('client disconnected from server');
  })
})


module.exports = server;

require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});
console.log(`configgggg ./.env.${process.env.NODE_ENV}`);
require('./db/mongoose');
const express = require('express');
const { saladGame } = require('./game-util/salad');
const app = express();
const auth = require('./middlewares/auth');
const { betManager } = require('./game-util/betManager'); 

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

/*
Salad Game Draw interval set up
*/
if (process.env.NODE_ENV !== 'test') {
  setInterval(function() {
    console.log("Lucky Draw starting");
    let result = saladGame.draw();
    console.log("result " + result);
    console.log('Last 8 result ' + saladGame.last8Results.toString());
  }, timeInterval);
}


// import routers
const UserRouter = require('./routes/user');
// use router
app.use(UserRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/bet', auth, async (req, res) => {
  try {
    if (saladGame.allowBet) {
      betManager.addBet(req.body);
      console.log(JSON.stringify(betManager.bettingqueue));
      res.send('you can bet');
    } else {
      res.status(400).send({ bet: req.body.bet });
    }
  } catch(e) {
    res.status(400).send(e.message);
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
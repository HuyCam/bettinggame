
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});
require('./db/mongoose');
const express = require('express');
const { saladGame } = require('./game-util/salad');
const app = express();
const path = require('path');
const auth = require('./middlewares/auth');
const { betManager } = require('./game-util/betManager'); 
const cors = require('cors');
const hbs = require('hbs');

const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Set up handlebars engine and views location
app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(cors());

saladGame.initiateGame();
const timeInterval = 35 * 1000;

/*
Salad Game Process interval set up
*/
if (process.env.NODE_ENV !== 'test') {
  setInterval(function() {
    console.log("Lucky Draw starting-------------------------------");
    let result = saladGame.draw();
    console.log("result " + result);
    // process winners 
    betManager.processBetResult(result);
    // emit update to client
    io.sockets.emit('update')
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
      //check if a user has enough money to bet and deduct money from user
      req.user.money -= req.body.bet.value;
      if (req.user.money < 0) {
        res.status(400).send({error: 'Insufficient fund'});
      } else {
        await req.user.save();
      }

      betManager.addBet(req.body);
      res.send(req.body.bet);
    } else {
      res.status(400).send('some error occured');
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
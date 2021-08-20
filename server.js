
require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env`});
require('./db/mongoose');
const express = require('express');
const { saladGame } = require('./game-util/salad');
const app = express();
const path = require('path');
const auth = require('./middlewares/auth');
const { betManager } = require('./game-util/betManager'); 
const cors = require('cors');
const User = require('./models/user');

const socketio = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketio(server);

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public');

// Set up handlebars engine and views location
app.set('view engine', 'ejs');


app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(cors());

saladGame.initiateGame();
const timeInterval = (saladGame.restTimer + saladGame.drawTimer);

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
    io.emit('update')
    console.log('Last 8 result ' + saladGame.last8Results.toString());
  }, timeInterval);
}


// import routers
const UserRouter = require('./routes/user');
// use router
app.use(UserRouter);

// app.get('/', (req, res) => {
//   res.render('pages/index');
// });

// app.get('/game', (req, res) => {
//   res.render('pages/game');
// });

/*
 betbody: {
   _id: id,
   bets:[{
     item:
     value:
   }]
 }
*/

app.get('/me', auth, async (req, res) => {
  const user = await req.user.toJSON();
  res.status(200).send({
    user: user
  })
})

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
  console.log('connection established ' + new Date(saladGame.nextDrawTime).toISOString());
  socket.emit('gamesetting', {
    nextDrawTime: new Date(saladGame.nextDrawTime).toISOString(),
    last8Results: saladGame.last8Results
   }, (error, success) => {
    if (error) {
      console.log(error)
    } else {
      console.log(success)
    }
  })


  socket.on('getresult', (callback) => {
    callback(null, 'got result', {
      nextDrawTime: new Date(saladGame.nextDrawTime).toISOString(),
      result: saladGame.lastResult,
      last8Results: saladGame.last8Results 
    });
  })


  socket.on('disconnect', () => {
    console.log('client disconnected from server');
  })

  socket.on('bet', async (betInfo, callback) => {
    try {
      if (saladGame.allowBet) {
        //get user
        const user = await User.findById(betInfo._id);
        //check if a user has enough money to bet and deduct money from user
        user.money -= betInfo.bet.value;
        if (user.money < 0) {
          callback('Insufficient fund', null);
        } else {
          await user.save();
        }
  
        let result = betManager.addBet(betInfo);
        if (result) {
          callback(null, 'Success', betInfo);
        } else {
          callback('Fail', null);
        }
  
      } else {
        callback('You can not bet right now', null);
      }
    } catch(e) {
      callback(e.message, null);
    }
    
  })

  socket.on('join', (data) => {
    console.log(data);
  })
})


module.exports = server;
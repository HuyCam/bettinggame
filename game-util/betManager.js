const User = require('../models/user');
const _ = require('underscore');
const { gameSetting } = require('./salad');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const { rankingManager }  = require('./rankingManager');
/*
bettingqueu: [ {
    _id: userID,
    bets:[{item, value}]
}]
*/
const betManager = {
    bettingqueue: [],
    processBetResult: async function(result) {
        // clear winner  queue
        rankingManager.resetWinnerQueue();
        // looping through betting queue to process bet
        for (let i = 0; i < this.bettingqueue.length; i++) {
            let betInfo = this.bettingqueue[i];

            const winningBet = _.findWhere(betInfo.bets, {item: result});
            const user = await User.findById(betInfo._id);
            if (winningBet) {
                let winAmount = parseInt(winningBet.value) * gameSetting.ITEM_WIN_TIMES[result];
                user.money += winAmount; 

                // add winner to big winner queue if applicable
                rankingManager.addBigWinner({
                    name: user.name,
                    winAmount: winAmount
                })
            }

            await user.save();
        }
        

        // clear bet
        this.clearBet();
        return;
    },
    addBet: function(newBet) {
        let userBet = _.findWhere(this.bettingqueue, { _id: newBet._id });
        let result = false;
        if (userBet) {
            // add that to userBet
            let bet = _.findWhere(userBet.bets, { item: newBet.bet.item});
            if (bet) {
                bet.value += newBet.bet.value;
                result = true;
                return result;
            } else if (userBet.bets.length < gameSetting.MAX_ITEM_BET) {
                lock.acquire('key1', function(done) {
                    userBet.bets.push(newBet.bet);
                    done();
                }, function(err, ret) {
                    if (err) {
                        throw new Error(`err`);
                    }
                    
                })
                result = true;
                return result;
            
            } else {
                throw new Error(`You can not bet more than ${gameSetting.MAX_ITEM_BET} items`);
            }
        } else {
            this.bettingqueue.push({
                _id: newBet._id,
                bets: [newBet.bet]
            });
            result = true;
            return result;
        }

        return result;
    },
    clearBet: function() {
        this.bettingqueue.splice(0, this.bettingqueue.length);
    }
}


exports.betManager = betManager;
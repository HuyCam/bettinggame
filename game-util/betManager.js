const User = require('../models/user');
const _ = require('underscore');
const { gameSetting } = require('./salad');
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

/*
bettingqueu: [ {
    _id: userID,
    bets:[{item, value}]
}]
*/
const betManager = {
    bettingqueue: [],
    processBetResult: async function(result) {
        // process bets
        for (let i = 0; i < this.bettingqueue.length; i++) {
            let betInfo = this.bettingqueue[i];

            const winningBet = _.findWhere(betInfo.bets, {item: result});
            const user = await User.findById(betInfo._id);
            if (winningBet) {
                user.money += parseInt(winningBet.value) * gameSetting.ITEM_WIN_TIMES[result];   
            }

            await user.save();
        }
        

        // clear bet
        this.clearBet();
        return;
    },
    addBet: function(newBet) {
       

        
    },
    clearBet: function() {
        this.bettingqueue.splice(0, this.bettingqueue.length);
    }
}


exports.betManager = betManager;
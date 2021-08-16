const User = require('../models/user');
const _ = require('underscore');
const { gameSetting } = require('./salad');

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
        // this.clearBet();
        return;
    },
    addBet: function(newBet) {
        let userBet = _.findWhere(this.bettingqueue, { _id: newBet._id });
        
        if (userBet) {
            // add that to userBet
            let bet = _.findWhere(userBet.bets, { item: newBet.bet.item});

            if (bet) {
                bet.value += newBet.bet.value;
                return;
            } else if (userBet.bets.length < gameSetting.MAX_ITEM_BET) {
                userBet.bets.push(newBet.bet);
            } else {
                throw new Error(`You can not bet more than ${gameSetting.MAX_ITEM_BET} foods`);
            }
        } else {
            this.bettingqueue.push({
                _id: newBet._id,
                bets: [newBet.bet]
            });
        }

        
    },
    clearBet: function() {
        this.bettingqueue.splice(0, this.bettingqueue.length);
    }
}


exports.betManager = betManager;
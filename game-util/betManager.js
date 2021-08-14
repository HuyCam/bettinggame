const User = require('../models/user');
const _ = require('underscore');
const { gameSetting } = require('./salad');

const betManager = {
    bettingqueue: [],
    processBetResult: function(result) {
        // process bets
        this.bettingqueue.forEach(async (e) => {

            const winningBet = _.findWhere(e.bet, {food: result});

            if (winningBet) {
                const user = await User.findById(e._id);
                user.money += e.value * gameSetting.FOOD_WIN_TIMES[result];
            }
        });

        // clear bet
        this.clearBet();
    },
    addBet: function(newBet) {
        let userBet = _.findWhere(this.bettingqueue, { _id: newBet._id });
        
        if (userBet) {
            // add that to userBet
            let bet = _.findWhere(userBet.bets, { food: newBet.bet.food});

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
/*
betting {
    _id: user IDBCursor,
    bets:[{food, value}]

}
*/

exports.betManager = betManager;
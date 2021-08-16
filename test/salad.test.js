let app = require('../server');
let User = require('../models/user');
const {userOne, userOneId, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const { saladGame } = require('../game-util/salad');
const { betManager } = require('../game-util/betManager');

beforeEach(setupDatabase)

test('User should get winning Money', async () => {
    const bets = [{
        _id: userOne._id,
        bet: {
            item: "COW",
            value: 300
        }
    }, {
        _id: userOne._id,
        bet: {
            item: "PANDA",
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: "HORSE",
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: "FOX",
            value: 450
        }
    },{
        _id: userOne._id,
        bet: {
            item: "LION",
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: "T_REX",
            value: 200
        }
    },{
        _id: userOne._id,
        bet: {
            item: "PYTHON",
            value: 300
        }
    }]

    betManager.addBet(bets[0]);
    saladGame.saveResult("COW");
    await betManager.processBetResult(saladGame.lastResult);

    let aUser = await User.findById(userOne._id);

    expect(aUser.money).toEqual(1500);

    betManager.addBet(bets[5]);
    saladGame.saveResult("T_REX");
    await betManager.processBetResult(saladGame.lastResult);

    aUser = await User.findById(userOne._id);

    expect(aUser.money).toEqual(10500);

})

const syncWait = ms => {
    const end = Date.now() + ms;
    while(Date.now() < end) continue
}
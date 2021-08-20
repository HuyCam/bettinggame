let app = require('../server');
let User = require('../models/user');
const {userOne, userOneId, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const { saladGame, BET_ITEM_TYPE } = require('../game-util/salad');
const { betManager } = require('../game-util/betManager');

beforeEach(setupDatabase)

test('User should get winning Money', async () => {
    const bets = [{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL,
            value: 300
        }
    }, {
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.DOG,
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.ELEPHANT,
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX,
            value: 450
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.JAGUAR,
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.SNAKE,
            value: 200
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION,
            value: 300
        }
    }]

    betManager.addBet(bets[0]);
    saladGame.saveResult(BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL);
    await betManager.processBetResult(saladGame.lastResult);

    let aUser = await User.findById(userOne._id);

    expect(aUser.money).toEqual(6000+1500);

    betManager.addBet(bets[6]);
    saladGame.saveResult(BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION);
    await betManager.processBetResult(saladGame.lastResult);

    aUser = await User.findById(userOne._id);

    expect(aUser.money).toEqual(6000+1500+13500);

})

const syncWait = ms => {
    const end = Date.now() + ms;
    while(Date.now() < end) continue
}
let app = require('../server');
let User = require('../models/user');
const {userOne, userOneId, setupDatabase } = require('./fixtures/db');
const request = require('supertest');
const { saladGame, BET_ITEM_TYPE } = require('../game-util/salad');
const { betManager } = require('../game-util/betManager');

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    try {
        const response = await request(app).post('/users').send({
            name: 'Thanh My',
            email: 'thanhmy@example.com',
            password: 'hellothere'
        }).expect(201)
    
        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull();
    
        expect(response.body).toMatchObject({
            user: {
                name: 'Thanh My',
                email: 'thanhmy@example.com'
            },
            token: user.tokens[0].token
        })
    } catch (e) {
        
    }
})

test('Should not sign up a already existed user', async() => {
    try {
        const response = await request(app).post('/users').send({
            name: 'Mike',
            email: 'mike@example.com',
            password: '56what!!'
        }).expect(400)
    
        const user = await User.findById(response.body.user._id);
        expect(user).toBeNull();
    } catch (e) {
        
    }

});

test('Should be able to login', async() => {
    const response = await request(app).post('/users/login').send({
        email: 'mike@example.com',
        password: '56what!!'
    }).expect(200)

    expect(response.body.user.name).toBe('Mike');
    expect(response.body.user.email).toBe('mike@example.com');
})

test('Should add bets', async () => {
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
    }, {
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX,
            value: 450
        }
    }];

    const response = await request(app).post('/bet')
    .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[0]).expect(200);

    expect(betManager.bettingqueue[0].bets).toEqual(expect.arrayContaining(
        [{
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL,
            value: 300
        }]));

    await request(app).post('/bet')
    .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[0]).expect(200);

    expect(betManager.bettingqueue[0].bets).toEqual(expect.arrayContaining(
        [{
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.BULL,
            value: 600
        }]));

    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[1]).expect(200);

    expect(betManager.bettingqueue[0].bets).toEqual(expect.arrayContaining(
        [{
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.DOG,
            value: 300
        }]));


    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[2]).expect(200);

    expect(betManager.bettingqueue[0].bets).toEqual(expect.arrayContaining(
        [{
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.FOX,
            value: 450
        }]));

    betManager.clearBet();
})


test('Should Not Add More Bets', async () => {
    const bets = [{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.ORCA,
            value: 300
        }
    }, {
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.ELEPHANT,
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.LOW_YIELD_ITEM.DOG,
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
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.LION,
            value: 300
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.T_REX,
            value: 200
        }
    },{
        _id: userOne._id,
        bet: {
            item: BET_ITEM_TYPE.HIGH_YIELD_ITEM.SNAKE,
            value: 300
        }
    }]

    await request(app).post('/bet')
    .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[0]).expect(200);

    await request(app).post('/bet')
    .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[1]).expect(200);
    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[2]).expect(200);
    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[3]).expect(200);
    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[4]).expect(200);
    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[5]).expect(200);
    await request(app).post('/bet')
        .set({ Authorization: `Bearer ${userOne.tokens[0].token}`  }).send(bets[6]).expect(400);
})






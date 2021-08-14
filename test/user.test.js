let app = require('../app');
let User = require('../models/user');
const {userOne, userOneId, setupDatabase } = require('./fixtures/db');
const request = require('supertest');

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    try {
        const response = await request(app).post('/users').send({
            name: 'Thanh My',
            email: 'thanhmy@example.com'
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
        done.fail(e)
    }
})

test('Should Add Bet', async () => {
    const bet = {
        _id: userOne._id,
        bet: {
            food: "CARROT",
            value: 300
        }
    }
    const response = await request(app).post('/bet').set({ Authroization: token })
})






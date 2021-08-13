const express = require('express');
const router = new express.Router();
const auth = require('../middlewares/auth');

// import models
const User = require('../models/user');

router.post('/users/me', auth, async (req, res) => {
    const user = await req.user.toJSON();

    res.send({ user: user });
})

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateToken();
        await user.save();

        const aUser = await user.toJSON();

        res.status(201).send({ user: aUser, token });
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email);
        const token = await user.generateToken();
        
        const aUser = await user.toJSON();

        res.status(201).send({user: aUser, token});
    } catch(e) {
        res.status(400).send(e);
    }
})

module.exports = router;

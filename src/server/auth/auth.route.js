const express = require('express');
const UserModel = require('./User.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const user = await UserModel.query().where({ email: req.body.email }).select('id', 'email', 'password');
    if (user.length == 0) {
        next(new Error('Invalid email'));
    }
})

module.exports = router;
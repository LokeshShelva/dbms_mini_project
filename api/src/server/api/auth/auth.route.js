const express = require('express');
const UserModel = require('../../Models/User.model');
const jwt = require('jsonwebtoken');
const yup = require('yup');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', (req, res) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
        role: yup.string().required(),
    });

    schema.validate(req.body, { abortEarly: false })
        .then(async (valid) => {
            const exsistingUser = await UserModel.query().where('email', valid.email);
            if (exsistingUser.length === 0) {
                const hashed = await bcrypt.hash(valid.password, 10);;
                valid['password'] = hashed;
                const user = await UserModel.query().insert({ ...valid })
                if (!user) {
                    res.status(200);
                    res.json({ errors: ['Unable to create user.'] })
                }
                res.status(200)
                res.json({ message: "Successfully create user" })
            } else {
                res.status(200)
                res.json({ errors: ['User with the email already exists.'] })
            }
        }
        ).catch((err) => {
            res.status(200)
            res.json({ errors: err.errors })
        })
})

router.post('/login', (req, res) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
    });

    schema.validate(req.body, { abortEarly: false })
        .then(async (valid) => {
            const user = await UserModel.query().where('email', valid.email).limit(1);
            if (user.length !== 0) {
                const validpass = await await bcrypt.compare(valid.password, user[0].password)
                if (validpass) {
                    const token = jwt.sign({ role: user[0].role, email: user[0].email, id: user[0].id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
                    res.status(200);
                    res.json({ token })
                } else {
                    res.status(200);
                    res.json({ errors: ["Email or Password incorrect"] })
                }
            } else {
                res.status(200);
                res.json({ errors: ["Email or Password incorrect"] })
            }

        })
        .catch((err) => {
            res.status(200)
            res.json({ errors: err.errors })
        })
})

module.exports = router;
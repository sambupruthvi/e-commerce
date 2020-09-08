const express = require('express');
const { body, validationResult } =require('express-validator');
const router = express.Router();
const userRepo = require('../../userRepository/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExist, requireValidPasswordForUser } = require('./validators');
// const { getOneBy } = require('../../userRepository/users');

router.get('/signup', (req, res) => {
    // res.send(`Call received at port ${port}`);
    res.send(
        signupTemplate({ req })
    );
});

router.post('/signup', [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send(signupTemplate({ req, errors }));
        } 
    const { email, password, confirmation } = req.body;
    const user = await userRepo.create({ email, password });

    req.session.userId = user.id;
    res.send('Account created!!!');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
})

router.get('/signin', (req, res) => {
    // res.send(`Call received at port ${port}`);
    res.send(
        signinTemplate({})
    );
});

router.post('/signin', [
    requireEmailExist,
    requireValidPasswordForUser
], async (req, res) => {
    const {email, password} = req.body;
    const Error = validationResult(req);
    // console.log(Error);
    if (!Error.isEmpty()) {
        return res.send(signinTemplate({Error}));
    }
    const user = await userRepo.getOneBy({ email });
    req.session.userId = user.id;
    res.send(`Welcome user ${user.email}`);
});

module.exports = router;
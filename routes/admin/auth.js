const express = require('express');
const { body, validationResult } =require('express-validator');
const router = express.Router();
const userRepo = require('../../userRepository/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators');

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
        const Error = validationResult(req);
        console.log(Error);
    // console.log('Post request received !!');
    const {email, password, confirmation} = req.body;
    
    const user = await userRepo.create({email, password});
    req.session.userId = user.id;
    res.send('Account Created');
});

router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
})

router.get('/signin', (req, res) => {
    // res.send(`Call received at port ${port}`);
    res.send(
        signinTemplate()
    );
});

router.post('/signin', async (req, res) => {
    // console.log('Post request received !!');
    const {email, password} = req.body;
    const user = await userRepo.getOneBy({email});
    if (!user) {
        return res.send('Email not found');
    }
    const check = await userRepo.comparePasswords(user.password, password);
    if (!check) {
        return res.send('Invalid Password');
    }
    // console.log(req.body);

    // const user = await userRepo.create({email, password});
    // req.session.userId = user.id;
    req.session.userId = user.id;
    res.send(`Welcome user ${user.email}`);
});

module.exports = router;
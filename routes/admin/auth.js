const userRepo = require('../../userRepository/users');
const express = require('express');
const router = express.Router();
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
router.get('/signup', (req, res) => {
    // res.send(`Call received at port ${port}`);
    res.send(
        signupTemplate({ req })
    );
});


router.post('/signup', async (req, res) => {
    // console.log('Post request received !!');
    const {email, password, confirmation} = req.body;
    const emailCheck = await userRepo.getOneBy({email});
    if (emailCheck) {
        return res.send('Email in use');
    }
    if (password !== confirmation) {
        return res.send('Password did not match');
    }
    // console.log(req.body);

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
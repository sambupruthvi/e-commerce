const express = require('express');
const bodyParser = require('body-parser');
const userRepo = require('./userRepository/users');
const cookieSession = require('cookie-session');

// make a express object that can be used to work with express functions
const app = express();
const port = 3000;

app.use(cookieSession({
    keys: ['asdf;lkjgh']
    // maxAge: 20
}))

app.use(bodyParser.urlencoded({extended: true}));
// route handler has path and callback functions
// app.METHOD(PATH, HANDLER)
app.get('/signup', (req, res) => {
    // res.send(`Call received at port ${port}`);
    res.send(`
        <div>
            <form method = "POST">
                <input name = "email" placeholder = "Email">
                <input name = "password" placeholder = "password">
                <input name = "confirmation" placeholder = "confirm password">
                <button>Sign Up</button>
            </form>
        </div>
    `);
});


app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
})

app.get('/signin', (req, res) => {
    // res.send(`Call received at port ${port}`);
    res.send(`
        <div>
            <form method = "POST">
                <input name = "email" placeholder = "Email">
                <input name = "password" placeholder = "password">
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/signin', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Listening at port ${port}.....`);
});
const express = require('express');
const bodyParser = require('body-parser');
// const userRepo = require('./userRepository/users');
const appRouter = require('./routes/admin/auth');
const cookieSession = require('cookie-session');

// make a express object that can be used to work with express functions
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
// route handler has path and callback functions
// app.METHOD(PATH, HANDLER)

app.use(cookieSession({
    keys: ['asdf;lkjgh']
    // maxAge: 20
}))

app.use(appRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port}.....`);
});
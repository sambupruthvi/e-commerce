const express = require('express');
const bodyParser = require('body-parser');

// make a express object that can be used to work with express functions
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
// route handler has path and callback functions
// app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
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

// const bodyParser = (req, res, next) => {
//     if (req.method === 'POST') {
//         req.on('data', data => {
//             const parseInfo = data.toString('utf8').split('&');
//             const result = {};
//             for (const itr of parseInfo) {
//                 const [key, value] = itr.split('=');
//                 result[key] = value;
//             }
//             req.body = result;
//             next();
//         });
//     } else {
//         next();
//     }
// }

app.post('/', (req, res) => {
    // console.log('Post request received !!');
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Listening at port ${port}.....`);
});
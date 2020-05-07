const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const database = low(adapter)

const app = express();
app.use(express.static('public3'));
app.use(cookieParser());
app.use(bodyParser.json());


app.post('/api/login', (req, res) => {
    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }

    if (body.username === 'chris' && body.password === 'pwd123') {
        res.cookie('loggedIn', 'true');
        resObj.success = true;
    }
    
    if (body.username === 'khalid' && body.password === 'khalid') {
        res.cookie('loggedIn', 'true');
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});

app.get('/api/isloggedin', (req, res) => {
    let cookies = req.cookies;

    let resObj = {
        isLoggedIn: false
    }

    if (cookies && cookies.loggedIn === 'true') {
        resObj.isLoggedIn = true;
    }

    res.send(JSON.stringify(resObj));
});

app.get('/api/logout', (req, res) => {
    let resObj = {
        success: true
    }

    res.clearCookie('loggedIn');
    res.send(JSON.stringify(resObj));
});




const port = 8000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) 
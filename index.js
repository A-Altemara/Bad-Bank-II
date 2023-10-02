var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(express.static('public'));
app.use(cors());

// test create a new user account
// app.get('/account/create/:name/:email/:password', function (req, res) {
//     res.send({
//         name: req.params.name,
//         email: req.params.email,
//         password: req.params.password
//     });
// });

// for data abstraction layer
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        })
});

// login to an account
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).
        then((loggedIn) => {
            console.log(loggedIn ? "Login Succeeded" : "Login Failed");
            res.send(loggedIn);
        });
});

// deposit funds to an account
app.get('/account/deposit/:email/:amount', function (req, res) {
    throw new Error("Not Implemented");

    res.send({
        email: req.params.email,
        amount: req.params.amount
    });
});

// withdraw funds from an account
app.get('/account/withdraw/:email/:amount', function (req, res) {
    throw new Error("Not Implemented");

    res.send({
        email: req.params.email,
        amount: req.params.amount
    });
});

// get the balance for an account
app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email).
        then((balance) => {
            console.log("Balance: " + balance);
            res.send(balance);
        });
});

// // test get all the data for all accounts
// app.get('/account/all', function (req, res) {
//     res.send({
//         name: req.params.name,
//         email: req.params.email,
//         password: req.params.password
//     });
// });

// for data abstraction layer
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);


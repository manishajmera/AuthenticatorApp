const express = require("express");
const bodyParser = require("body-parser");
const user = require("./controller/authenticatorController")
const app = express();
const cors = require('cors');
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// simple route
app.get('/', (req, res) => {
    res.json({ status: true, message: 'Welcome to todo Application' });
});

app.post('/createUser',user.createUser);
app.post('/authenticateUser',user.authenticateUser);
app.post('/resetPassword',user.resetPassword);


// Invalid route
app.get('*', (req, res) => {
    res.json({ status: false, message: 'Invalid Route' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8011;
app.listen(PORT, () => {
    console.log('Server is running on port '+PORT);
});

const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.use('/',express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

exports.captivefire = functions.https.onRequest(app);


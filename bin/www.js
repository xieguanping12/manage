#!/usr/bin/env node
var express = require('express');
var app = express();

app.get('/',function (req,res) {
    res.send('hello world');
});

app.listen(3000);
console.log('http://localhost:3000 server started');
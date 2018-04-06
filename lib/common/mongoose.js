//连接mongodb
let mongoose = require('mongoose');
let conn = 'mongodb://localhost/db';

db = mongoose.createConnection(conn);
module.exports = db;

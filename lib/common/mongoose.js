//连接mongodb
let mongoose = require('mongoose');
let conn = 'mongodb://localhost/manage';

db = mongoose.createConnection(conn);
module.exports = db;

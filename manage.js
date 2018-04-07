//引入模块包
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');//解析post请求体

app = express(); //创建一个express应用

app.use(express.static('public'));//前端资源文件根目录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//设置模板引擎ejs

db = require('./lib/common/mongoose');//连接mongodb数据库

//引入路由模块
let admin = require('./routers/admin');
let api = require('./routers/api');
let home = require('./routers/home');

app.use('/admin', admin);
app.use('/api', api);
app.use('/', home);

app.listen(3000);
console.log('http://localhost:3000 server started');
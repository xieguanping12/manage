//引入模块包
let express = require('express');
let path = require('path');

app = express(); //创建一个express应用

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//设置模板引擎ejs

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(3000);
console.log('http://localhost:3000 server started');
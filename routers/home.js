//首页路由
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;
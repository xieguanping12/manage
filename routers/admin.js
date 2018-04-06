//后台管理路由
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/index');
});

module.exports = router;
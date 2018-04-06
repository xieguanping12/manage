//api 路由
let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.json({"name": "xgp", "age": 27});
});

module.exports = router;
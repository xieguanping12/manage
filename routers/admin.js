//后台管理路由
let express = require('express');
let router = express.Router();
let md5 = require('md5');
let trim = require('trim');

let Users = require('../models/Users');

router.get('/', function (req, res) {
    res.render('admin/index');
});
router.get('/user/list', function (req, res) {
    Users.find({}, function (err, data) {
        if (data.length > 0) {
            res.render('admin/user/index', {title: "用户列表", users: data});
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

router.get('/user', function (req, res) {
    Users.findById(req.query._id, function (err, data) {
        if (data) {
            res.render('admin/user/detail', {title: "用户详情", user: data})
        } else {
            res.json({"error": true, "message": "用户不存在"});
        }
    });
});

router.get('/user/save', function (req, res) {
    _id = req.query._id;
    if (_id) {
        Users.findById(_id, function (err, data) {
            title = '修改用户';
            res.render('admin/user/save', {title: title, user: data});
        });
    } else {
        title = '添加用户';
        res.render('admin/user/save', {title: title, user: ''});
    }
});

router.post('/user/save', function (req, res) {
    _id = req.body._id;
    if (_id) {
        Users.findById(_id, function (err, data) {
            if (data) {
                updateData = {
                    name: trim(req.body.name),
                    passwd: md5(trim(req.body.passwd)),
                    email: trim(req.body.email)
                };
                Users.where({_id: _id}).update({$set: updateData}, function (err, data) {
                    if (err) {
                        res.json({"code": -1, "status": "fail", "message": "更新失败"});
                    } else {
                        res.json({"code": 0, "status": "ok", "message": "更新成功"});
                    }
                });
            } else {
                res.json({"error": true, "message": "用户不存在"});
            }
        });
    } else {
        let name = trim(req.body.name);
        let email = trim(req.body.email);
        Users.findOne({name: name}, function (err, data) {
            if (data) {
                res.json({"code": -1, "status": "fail", "message": name + "的用户名已存在,不可重复，请重新创建"});
            }
        });
        Users.findOne({email: email}, function (err, data) {
            if (data) {
                res.json({"code": -1, "status": "fail", "message": email + "的邮箱地址已存在,不可重复，请重新创建"});
            }
        });
        user = new Users();
        user.name = name;
        user.passwd = md5(trim(req.body.passwd));
        user.type = 1;
        user.email = email;
        user.createtime = Date.now();
        user.updatetime = Date.now()
        user.save(function (err, data) {
            if (err) {
                console.log(err);
                res.json({"code": -1, "status": "fail", "message": "创建用户失败"});
            } else {
                res.json({"code": 0, "status": "ok", "message": "创建用户成功"});
            }
        });
    }
});

router.post('/user/delete', function (req, res) {
    _id = req.body._id;
    Users.findById(_id).remove(function (err, data) {
        if (err) {
            res.json({"code": -1, "status": "fail", "message": "删除失败"})
        }
        res.json({"code": 0, "status": "ok", "message": "删除成功"});
    });
});

module.exports = router;
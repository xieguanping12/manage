let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let validate = require('mongoose-validator');

let emailValidator = [
    validate({
        validator: 'isEmail',
        message: '邮箱格式错误'
    })
];

let nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [1, 12],
        message: '用户名必须在 {ARGS[0]} - {ARGS[1]} 之间'
    }),
    validate({
        validator: 'matches',
        arguments: /\w+/,
        message: '用户名不能使用特殊字符'
    })
];

let Users = new Schema({
    name: {type: String, required: true, unique: true, validate: nameValidator},
    passwd: {type: String, required: true},
    type: {type: Number, require: true, default: 0},//0-普通用户 1-管理员
    email: {type: String, required: true, unique: true, validate: emailValidator},
    createtime: {type: Date, required: true, default: Date.now()},
    updatetime: {type: Date, default: Date.now()}
});

module.exports = db.model('Users', Users);
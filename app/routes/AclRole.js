/**
 * Created with JetBrains WebStorm.
 * User: grhuang
 * Date: 13-8-29
 * Time: 下午12:32
 * To change this template use File | Settings | File Templates.
 */
var mModel  = require('../models/AclRole.js'),
    _       = require('underscore'),
    c    = require('../lib/crud.js');


exports.list = function (req, res, next) {
    return c.list(mModel, req, res, next);
}

exports.get = function (req, res, next) {
    return c.get(mModel, req, res, next);
}

exports.put = function (req, res, next) {
    return c.put(mModel, req, res, next);
}

exports.post = function (req, res, next) {
    return c.post(mModel, req, res, next);
}

exports.del = function (req, res, next) {
    return c.del(mModel, req, res, next);
}
/*!
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , logger = require('mean-logger')
    ,path = require('path')
    , crud = require('./app/lib/crud');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

// bootstrap passport config
require('./config/passport')(passport, config);

var app = express();

// express settings
require('./config/express')(app, config, passport);

// Bootstrap routes
require('./config/routes')(app, passport, auth);

// CRUD routes
var routeFiles = fs.readdirSync( './app/routes');
var route = '';
var models = [];

for (var r = 0; r < routeFiles.length; r++) {
    route = path.basename(routeFiles[r], '.js');
    if (route != '') models.push(route);
}
var model = null;
for (var i = 0; i < models.length; i++) {
    console.log('...CRUD Routing ' + models[i]);
    model = require('./app/routes/' + models[i]);
    crud.setUpServer(app, '/' + models[i], model);
}

// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port '+port);

//Initializing logger 
logger.init(app, passport, mongoose);

// expose app
exports = module.exports = app;

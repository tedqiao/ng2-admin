import express = require("express");
import bodyParser = require ("body-parser");
import routers = require('./config/routes/Routes');
import path = require('path');
import mongoose = require('mongoose');
import morgan = require('morgan');
import oauth2 = require('./app/modules/auth2/oauth2');
import passport = require('passport');

import {Config} from './config/envirment/config';


var app = express();


mongoose.connect(Config.current.mongoConnectionString, ()=> {

});
app.set('port', Config.current.port);


//noinspection TypeScriptValidateTypes
app.use(express.static(path.resolve(__dirname, '../client')));
//noinspection TypeScriptValidateTypes
app.use(express.static(path.resolve(__dirname, '../../node_modules')));
//noinspection TypeScriptValidateTypes
app.use(bodyParser.json());
//noinspection TypeScriptValidateTypes
app.use(bodyParser.urlencoded({
  extended: true
}));
//noinspection TypeScriptValidateTypes
app.use(morgan('dev'));


require('./app/modules/auth2/oauth2.passport');
//noinspection TypeScriptValidateTypes
app.use(passport.initialize());

//noinspection TypeScriptValidateTypes
app.post('/oauth/token', oauth2);

//noinspection TypeScriptValidateTypes
app.use('/api', passport.authenticate('bearer', {session: false}), routers);

var renderIndex = (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
}

//noinspection TypeScriptValidateTypes
app.get('/*', renderIndex);

if (Config.env === 'development') {
  //noinspection TypeScriptValidateTypes
  app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
      error: err,
      message: err.message
    });
  });
}


// catch 404 and forward to error handler
//noinspection TypeScriptValidateTypes
app.use(function (req: express.Request, res: express.Response, next: any) {
  let err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
//noinspection TypeScriptValidateTypes
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export {app}

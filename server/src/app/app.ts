import * as express from "express";
import * as bodyParser from "body-parser";
import * as routers from './config/routes/Routes';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as oauth2 from './modules/oauth2/oauth2';
import * as passport from 'passport';

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


require('./modules/oauth2/oauth2.passport');
//noinspection TypeScriptValidateTypes
app.use(passport.initialize());

//noinspection TypeScriptValidateTypes
app.post('/oauth/token', oauth2);


// custom callback

//noinspection TypeScriptValidateTypes
app.use('/api',
  passport.authenticate('bearer', {session: false}),
  function (req, res, next) {
    next();
  }, routers);

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

export default app;
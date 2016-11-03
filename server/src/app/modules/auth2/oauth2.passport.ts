var config = require('./../../../config/envirment/config').Config;
var passport = require('passport');
var passport_oauth2_client_password = require('passport-oauth2-client-password');
var passport_http_bearer = require('passport-http-bearer');
var UserModel = require('./oauth2.schema.User');
var ClientModel = require('./oauth2.schema.Client');
var AccessTokenModel = require('./oauth2.schema.AccessToken');

//noinspection TypeScriptUnresolvedVariable
var ClientPasswordStrategy = passport_oauth2_client_password.Strategy;
var BearerStrategy = passport_http_bearer.Strategy;

passport.use(new ClientPasswordStrategy(
  function (clientId, clientSecret, done) {
    ClientModel.findOne({clientId: clientId}, function (err, client) {
      if (err) {
        return done(err);
      }
      if (!client) {
        return done(null, false);
      }
      if (client.clientSecret != clientSecret) {
        return done(null, false);
      }

      return done(null, client);
    });
  }
));

passport.use(new
  BearerStrategy(
  function (accessToken, done) {
    AccessTokenModel.findOne({token: accessToken}, function (err, token) {
      if (err) {
        return done(err);
      }
      if (!token) {
        return done(null, false);
      }

      if (Math.round((Date.now() - token.created) / 1000) > config.current.tokenLife) {
        console.log('Token expired');
        AccessTokenModel.remove({token: accessToken}, function (err) {
          if (err) return done(err);
        });
        return done(null, false, {message: 'Token expired'});
      }

      UserModel.findById(token.userId, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Unknown user'});
        }

        var info = {scope: '*'}
        done(null, user, info);
      });
    });
  }
));


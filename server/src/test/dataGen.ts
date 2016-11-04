import  Log = require('log');
import  mongoose = require('mongoose');
import  UserModel = require('../app/modules/oauth2/oauth2.schema.User');
import  ClientModel = require('../app/modules/oauth2/oauth2.schema.Client');
import  AccessTokenModel = require('../app/modules/oauth2/oauth2.schema.AccessToken');
import  RefreshTokenModel = require('../app/modules/oauth2/oauth2.schema.RefreshToken');
import  faker               = require('faker');
import {Config} from './../config/envirment/config';
var log = new Log('info');

mongoose.connect(Config.current.mongoConnectionString, ()=> {
  console.log('connect to db');
});

UserModel.remove({}, function (err) {
  var user = new UserModel({username: "andrey", password: "simplepassword"});
  user.save(function (err, user) {
    if (err) return log.error(err);
    else log.info("New user - %s", user);
  });

  for (var i = 0; i < 4; i++) {
    var user = new UserModel({username: faker.name.findName().toLowerCase(), password: faker.lorem.words(1)[0]});
    user.save(function (err, user) {
      if (err) return log.error(err);
      else log.info("New user - %s", user);
    });
  }
});

ClientModel.remove({}, function (err) {
  var client = new ClientModel({name: "iOS client v1", clientId: "mobileV1", clientSecret: "abc123456"});
  client.save(function (err, client) {
    if (err) return log.error(err);
    else log.info("New client - %s", client);
  });
  client = new ClientModel({name: "angular2 client v1", clientId: "angularV1", clientSecret: "abc123456"});
  client.save(function (err, client) {
    if (err) return log.error(err);
    else log.info("New client - %s", client);
  });
});

AccessTokenModel.remove({}, function (err) {
  if (err) return log.error(err);
});

RefreshTokenModel.remove({}, function (err) {
  if (err) return log.error(err);
});

setTimeout(function () {
  mongoose.disconnect();
}, 3000);

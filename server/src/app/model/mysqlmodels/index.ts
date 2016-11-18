import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import {Config} from './../../config/envirment/config';

import * as User from './user';
import * as Oauth2Client from './Oauth2Client';
import * as Oauth2AccessToken from "./Oauth2AccessToken";
import * as Oauth2RefreshToken from "./Oauth2RefreshToken";

interface DbConnection {
  User: Sequelize.Model<User.UserInstance,User.UserAttributes>;
  Oauth2Client: Sequelize.Model<Oauth2Client.Oauth2ClientInstance,Oauth2Client.Oauth2ClientAttributes>;
  Oauth2AccessToken: Sequelize.Model<Oauth2AccessToken.Oauth2AccessTokenInstance,Oauth2AccessToken.Oauth2AccessTokenAttributes>;
  Oauth2RefreshToken: Sequelize.Model<Oauth2RefreshToken.Oauth2RefreshTokenInstance,Oauth2RefreshToken.Oauth2RefreshTokenAttributes>;
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.Sequelize ;
}
var db = {};

// I use the node-config package to manage the DB config you can choose
// to stick with the original version. And I removed environment variable
// support because I don't need it.
var sequelize = new Sequelize(
  Config.current.mysql.database,
  Config.current.mysql.username,
  Config.current.mysql.password,
  {
    dialect: Config.current.mysql.dialect,
    host: Config.current.mysql.host,
    logging: Config.current.mysql.logging,
    define: {
      freezeTableName: false,
      syncOnAssociation: true,
      charset: 'utf8mb4',
      classMethods: {
        method1: function () {
        }
      },
      instanceMethods: {
        method2: function () {
        }
      },
      timestamps: true
    },
  }
);

var basename = path.basename(module.filename);
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    console.log("load:" + file);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    // NOTE: you have to change from the original property notation to
    // index notation or tsc will complain about undefined property.
    db[model['name']] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

export default <DbConnection>db;

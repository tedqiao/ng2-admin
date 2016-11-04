import mongoose = require('mongoose');
import crypto = require('crypto');

class User {
  static get Schema() {
    var user = new mongoose.Schema({
      username: {
        type: String,
        unique: true,
        required: true
      },
      hashedPassword: {
        type: String,
        required: true
      },
      salt: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    });

    user.methods.encryptPassword = function (password) {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
      //more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
    };

    user.virtual('userId')
      .get(function () {
        return this.id;
      });

    user.virtual('password')
      .set(function (password) {
        this._plainPassword = password;
        //noinspection TypeScriptUnresolvedFunction
        this.salt = crypto.randomBytes(32).toString('hex');
        //more secure - this.salt = crypto.randomBytes(128).toString('hex');
        this.hashedPassword = this.encryptPassword(password);
      })
      .get(function () {
        return this._plainPassword;
      });


    user.methods.checkPassword = function (password) {
      return this.encryptPassword(password) === this.hashedPassword;
    };

    user.methods.checkPassword = function (password) {
      return this.encryptPassword(password) === this.hashedPassword;
    };

    return user;
  }
}


var UserModel = mongoose.model('oauth_users', User.Schema);
export = UserModel;


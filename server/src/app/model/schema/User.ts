import mongoose = require('mongoose');
import crypto = require('crypto');

var Schema = mongoose.Schema;
class User {
  static get Schema() {
    var user = new Schema({
      username: {
        type: String,
        unique: true,
        required: true
      },
      email: {
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
      },
      status: {
        type: Number,
        default: 1
      },
      roles: [{type: String}],
      details: [{type: Schema.Types.ObjectId, ref: 'Details'}]
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

    return user;
  }
}


var UserModel = mongoose.model('users', User.Schema);
export = UserModel;


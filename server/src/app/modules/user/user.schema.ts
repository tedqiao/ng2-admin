import mongoose = require('mongoose')
import {IUser} from "../../model/interfaces/IUser";
import bcrypt = require('bcrypt-nodejs');
import crypto = require('crypto');
class UserSchema {
  static get schema() {
    var userSchema = new mongoose.Schema({
      username: {type: String, required: true, unique: true},
      email: {type: String, required: true, unique: true, lowercase: true},
      password: {type: String, required: true},
      resetPasswordToken: String,
      resetPasswordExpires: Date
    });


    /**
     * Password hash middleware.
     */
    userSchema.pre('save', function save(next) {
      const user = this;
      if (!user.isModified('password')) return next();
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    });

    /**
     * Helper method for validating user's password.
     */
    userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
      });
    };

    /**
     * Helper method for getting user's gravatar.
     */
    userSchema.methods.gravatar = function gravatar(size) {
      if (!size) {
        size = 200;
      }
      if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
      }
      const md5 = crypto.createHash('md5').update(this.email).digest('hex');
      return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
    };


    return userSchema;
  }
}

var User = mongoose.model<IUser>('UserSchema', UserSchema.schema);

export = User;



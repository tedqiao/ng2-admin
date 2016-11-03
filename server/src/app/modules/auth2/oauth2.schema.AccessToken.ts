import mongoose = require('mongoose');

class AccessToken{

  static get Schema(){
    var AccessToken = new mongoose.Schema({
      userId: {
        type: String,
        required: true
      },
      clientId: {
        type: String,
        required: true
      },
      token: {
        type: String,
        unique: true,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    });

    return AccessToken;
  }
}


var AccessTokenModule = mongoose.model('oauth_access_token', AccessToken.Schema);
export = AccessTokenModule;

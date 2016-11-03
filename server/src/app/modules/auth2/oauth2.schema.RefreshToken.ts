import mongoose = require('mongoose');

class RefreshToken{

  static get Schema(){
    var refreshToken = new mongoose.Schema({
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

    return refreshToken;
  }
}


var RefreshTokenModule = mongoose.model('oauth_refresh_token', RefreshToken.Schema);
export = RefreshTokenModule;

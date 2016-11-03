import mongoose = require('mongoose');

class Client{

  static get Schema(){
    var client = new mongoose.Schema({
      name: {
        type: String,
        unique: true,
        required: true
      },
      clientId: {
        type: String,
        unique: true,
        required: true
      },
      clientSecret: {
        type: String,
        required: true
      }
    });

    return client;
  }
}


var ClientModule = mongoose.model('oauth_client_details', Client.Schema);
export = ClientModule;

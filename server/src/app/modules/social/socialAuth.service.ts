import rp = require('request-promise');
import config from './config'

interface params {
  code?: string;
  client_id?: string,
  client_secret?: string,
  redirect_uri?: string,
  grant_type?: string
}


export class socialAuthService {
  accessTokenUrl: string;
  userApiUrl: string;
  params: params;

  constructor(code, provider) {
    this.params = {
      code: code,
      client_id: config[provider].client_id,
      client_secret: config[provider].client_secret,
      redirect_uri: config[provider].redirect_uri,
      grant_type: "authorization_code"
    }

    this.accessTokenUrl = config[provider].accessTokenUrl;
    this.userApiUrl = config[provider].userApiUrl;

    console.log(code);
  }

  getUser() {
    return this._getAccessToken();
  }

  private _getAccessToken() {
    var Options = {
      method: 'POST',
      uri: this.accessTokenUrl,
      form: this.params,
      json: true
    };

    return rp(Options)
      .then(this._getDetail)
      .catch(err=> {
        console.log(err);
      })
  }

  private _getDetail = (token)=>{
    var accessToken = token.access_token;
    var headers = {Authorization: 'Bearer ' + accessToken};
    var options = {
      uri: this.userApiUrl,
      headers: headers,
      json: true
    };

    return rp(options);
  }


}

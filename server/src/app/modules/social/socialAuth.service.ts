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
  peopleApiUrl: string;
  params: params;

  constructor(code, social) {
    this.params = {
      code: code,
      client_id: config[social].client_id,
      client_secret: config[social].client_secret,
      redirect_uri: config[social].redirect_uri,
      grant_type: "authorization_code"
    }

    this.accessTokenUrl = config[social].accessTokenUrl;
    this.peopleApiUrl = config[social].peopleApiUrl;

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
      .then(token=> {
        return this._getDetail(token);
      })
      .catch(err=> {
        console.log(err);
      })
  }

  private _getDetail(token) {
    var accessToken = token.access_token;
    var headers = {Authorization: 'Bearer ' + accessToken};
    var options = {
      uri: this.peopleApiUrl,
      headers: headers,
      json: true
    };

    return rp(options);
  }


}

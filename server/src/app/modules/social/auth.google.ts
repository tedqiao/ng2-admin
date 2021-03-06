import {socialAuthService} from './socialAuth.service';
import ss from './social.service';

interface User {
  facebook: string;
  wechat: string;
  googleId: string;
  email: string;
  username: string;
  avatar: string;
}

export class googleAuth {
  private _provider: string = 'google';
  private _user: User;
  private _auth: socialAuthService;

  constructor(code) {
    this._auth = new socialAuthService(code, this._provider);

  }

  extractUserData = ()=> {
    return this._auth.getUser()
      .then((data)=> {
        this._user = {
          facebook: null,
          wechat: null,
          googleId: data.sub,
          username: data.name,
          email: data.email,
          avatar: data.picture,
          displayname:data.name
        }
        return this._user;
      });
  }
}

export default function google(req, res, done) {
  var gauth = new googleAuth(req.body.code);
  ss.setClientId(req.body.clientId);
  return Promise.resolve()
    .then(gauth.extractUserData)
    .then(ss.findorCreate)
    .then(ss.generateToken)
    .then((token)=>{
      res.json(token);
    })
    .catch(err=> {
      done(err);
    });
}

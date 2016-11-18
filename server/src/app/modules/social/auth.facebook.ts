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

export class facebookAuth {
  private _provider: string = 'facebook';
  private _user: User;
  private _auth: socialAuthService;

  constructor(code) {
    this._auth = new socialAuthService(code, this._provider);
  }

  extractUserData = ()=> {
    return this._auth.getUser()
      .then((data)=> {
        console.log(data);
        this._user = {
          facebook: data.id,
          wechat: null,
          googleId: null,
          username: data.name,
          email: data.email,
          avatar: data.picture,
          displayname:data.name
        }
        return this._user;
      });
  }
}

export default function facebook(req, res, done) {
  var fauth = new facebookAuth(req.body.code);
  ss.setClientId(req.body.clientId);
  return Promise.resolve()
    .then(fauth.extractUserData)
    .then(ss.findorCreate)
    .then(ss.generateToken)
    .then((token)=>{
      res.json(token);
    })
    .catch(err=> {
      done(err);
    });
}

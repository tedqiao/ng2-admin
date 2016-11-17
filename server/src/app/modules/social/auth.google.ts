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
  social: string = 'google';
  user: User;
  private _auth: socialAuthService;

  constructor(code) {
    this._auth = new socialAuthService(code, this.social);

  }

  extractUserData = ()=> {
    return this._auth.getUser()
      .then((data)=> {
        this.user = {
          facebook: null,
          wechat: null,
          googleId: data.sub != null ? data.sub : null,
          username: data.name,
          email: data.email,
          avatar: data.picture
        }
        return this.user;
      });
  }
}

export default function (req, res, done) {
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

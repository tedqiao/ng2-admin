import * as oauth2orize from 'oauth2orize';
import * as passport from 'passport';
import * as crypto from 'crypto';
import {Config} from './../../config/envirment/config';
import db from './../../model/mysqlmodels/index';
import {tokenException} from "../../common/Exceptions/tokenException";

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
  var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
  var tokenValue = crypto.randomBytes(32).toString('hex');
  var refreshTokenValue = crypto.randomBytes(32).toString('hex');
  db.User.findOne({where: criteria})
    .then((user)=> {
      if (!user)
        return done(null, false);

      if (!user.checkPassword(password)) {
        return done(null, false);
      }
      return user;
    })
    .then((user: any)=> {
      return db.Oauth2RefreshToken.destroy({where: {userId: user.userId, clientId: client.clientId}})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });

    })
    .then((user: any)=> {
      return db.Oauth2AccessToken.destroy({where: {userId: user.userId, clientId: client.clientId}})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });
    })
    .then((user: any)=> {
      return db.Oauth2AccessToken.create({userId: user.userId, clientId: client.clientId, token: tokenValue})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });
    })
    .then((user: any)=> {
      return db.Oauth2RefreshToken.create({userId: user.userId, clientId: client.clientId, token: refreshTokenValue})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });
    })
    .then(()=> {
      return done(null, tokenValue, refreshTokenValue, {'expires_in': Config.current.tokenLife});
    })
    .catch((err)=> {
      return done(err);
    });

// UserModel.findOne(criteria, function (err, user) {
//   if (err) {
//     return done(err);
//   }
//   if (!user) {
//     return done(null, false);
//   }
//   if (!user.checkPassword(password)) {
//     return done(null, false);
//   }
//
//   RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
//     if (err) return done(err);
//   });
//   AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
//     if (err) return done(err);
//   });
//
//   var tokenValue = crypto.randomBytes(32).toString('hex');
//   var refreshTokenValue = crypto.randomBytes(32).toString('hex');
//   var token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
//   var refreshToken = new RefreshTokenModel({
//     token: refreshTokenValue,
//     clientId: client.clientId,
//     userId: user.userId
//   });
//   refreshToken.save(function (err) {
//     if (err) {
//       return done(err);
//     }
//   });
//   var info = {scope: '*'}
//   token.save(function (err, token) {
//     if (err) {
//       return done(err);
//     }
//     done(null, tokenValue, refreshTokenValue, {'expires_in': Config.current.tokenLife});
//   });
// });
}));

// Exchange refreshToken for an access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
  var tokenValue = crypto.randomBytes(32).toString('hex');
  var refreshTokenValue = crypto.randomBytes(32).toString('hex');
  db.Oauth2RefreshToken.findOne({where: {token: refreshToken}})
    .then((token)=> {
      if (!token)
        return done(null, false);

      return token;
    })
    .then((token: any)=> {
      if(!token)
        throw new tokenException();

      return db.User.findOne({where: {userId: token.userId}})
        .then((user)=> {
          if (!user)
            return done(null, false);

          return user;
        })
        .catch((err)=> {
          return done(err);
        });
    })
    .then((user: any)=> {
      console.log('err');
      return db.Oauth2RefreshToken.destroy({where: {userId: user.userId, clientId: client.clientId}})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });

    })
    .then((user: any)=> {
      return db.Oauth2AccessToken.destroy({where: {userId: user.userId, clientId: client.clientId}})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });
    })
    .then((user: any)=> {
      return db.Oauth2AccessToken.create({userId: user.userId, clientId: client.clientId, token: tokenValue})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });
    })
    .then((user: any)=> {
      return db.Oauth2RefreshToken.create({userId: user.userId, clientId: client.clientId, token: refreshTokenValue})
        .then(()=> {
          return user;
        })
        .catch((err)=> {
          return done(null, false);
        });
    })
    .then(()=> {
      return done(null, tokenValue, refreshTokenValue, {'expires_in': Config.current.tokenLife});
    })
    .catch((err)=> {
        if(err.name === 'token') {
          return;
        }
        return done(err);
    });


  // RefreshTokenModel.findOne({token: refreshToken}, function (err, token) {
  //   if (err) {
  //     return done(err);
  //   }
  //   if (!token) {
  //     return done(null, false);
  //   }
  //   if (!token) {
  //     return done(null, false);
  //   }
  //
  //   UserModel.findById(token.userId, function (err, user) {
  //     if (err) {
  //       return done(err);
  //     }
  //     if (!user) {
  //       return done(null, false);
  //     }
  //
  //     RefreshTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
  //       if (err) return done(err);
  //     });
  //     AccessTokenModel.remove({userId: user.userId, clientId: client.clientId}, function (err) {
  //       if (err) return done(err);
  //     });
  //
  //     var tokenValue = crypto.randomBytes(32).toString('hex');
  //     var refreshTokenValue = crypto.randomBytes(32).toString('hex');
  //     var token = new AccessTokenModel({token: tokenValue, clientId: client.clientId, userId: user.userId});
  //     var refreshToken = new RefreshTokenModel({
  //       token: refreshTokenValue,
  //       clientId: client.clientId,
  //       userId: user.userId
  //     });
  //     refreshToken.save(function (err) {
  //       if (err) {
  //         return done(err);
  //       }
  //     });
  //     var info = {scope: '*'}
  //     token.save(function (err, token) {
  //       if (err) {
  //         return done(err);
  //       }
  //       done(null, tokenValue, refreshTokenValue, {'expires_in': Config.current.tokenLife});
  //     });
  //   });
  // });
}));


var oauth2 = [
  passport.authenticate('oauth2-client-password', {session: false}),
  server.token(),
  server.errorHandler()
]
// token endpoint
export = oauth2;

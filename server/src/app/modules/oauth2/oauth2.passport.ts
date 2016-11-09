import {Config} from './../../config/envirment/config';
import * as passport from 'passport';
import * as passport_oauth2_client_password from 'passport-oauth2-client-password';
import * as passport_http_bearer from 'passport-http-bearer';
import db from './../../model/mysqlmodels/index';
import {tokenException} from "../../common/Exceptions/tokenException";

//noinspection TypeScriptUnresolvedVariable
var ClientPasswordStrategy = passport_oauth2_client_password.Strategy;
var BearerStrategy = passport_http_bearer.Strategy;

passport.use(new ClientPasswordStrategy(
  function (clientId, clientSecret, done) {
    db.Oauth2Client.findById(clientId)
      .then((client)=> {
        if (!client)
          return done(null, false);
        if (client.clientSecret !== clientSecret)
          return done(null, false);
        return done(null, client);
      }).catch((err)=> {
      return done(err);
    })
    // ClientModel.findOne({clientId: clientId}, function (err, client) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!client) {
    //     return done(null, false);
    //   }
    //   if (client.clientSecret != clientSecret) {
    //     return done(null, false);
    //   }
    //
    //   return done(null, client);
    // });


  }
));

passport.use(new
  BearerStrategy(
  function (accessToken, done) {
    db.Oauth2AccessToken.findOne({where: {token: accessToken}})
      .then((token: any)=> {
        if (!token) {
          return done(null, false, 'Unauthorized');
        }

        if (Math.round((Date.now() - token.createdAt) / 1000) > Config.current.tokenLife) {
          return db.Oauth2AccessToken.destroy({where: {token: accessToken}})
            .then(()=> {
              return done(null, false, 'Token expired');
            })
            .catch((err)=> {
              return done(err);
            });
        }
        else {
          return token;
        }
      })
      .then((token: any)=> {
        if (!token)
          throw new tokenException();

        return db.User.findOne({where: {userId: token.userId}, attributes: ['userId']})
          .then((user)=> {
            if (!user)
              return done(null, false, 'Unauthorized');
            var info: any = user;
            done(null, user, info);
          })
          .catch((err)=> {
            return done(err);
          });
      })
      .catch((err)=> {
        if (err.name === 'token') {
          return;
        }

        return done(err);
      });

    // AccessTokenModel.findOne({token: accessToken}, function (err, token) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!token) {
    //     return done(null, false, 'Unauthorized');
    //   }
    //
    //   if (Math.round((Date.now() - token.created) / 1000) > Config.current.tokenLife) {
    //     AccessTokenModel.remove({token: accessToken}, function (err) {
    //       if (err) return done(err);
    //     });
    //     return done(null, false, 'Token expired');
    //   }
    //
    //   UserModel.findById(token.userId, 'username email status', function (err, user) {
    //     if (err) {
    //       return done(err);
    //     }
    //     if (!user) {
    //       return done(null, false, 'Unauthorized');
    //     }
    //
    //     var info = user
    //     done(null, user, info);
    //   });
    // });
  }
));


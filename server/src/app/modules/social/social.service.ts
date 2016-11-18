import model from './../../model/mysqlmodels/index';
import * as crypto from 'crypto';
import * as Sequelize from 'sequelize';
import {UserInstance, UserAttributes} from "../../model/mysqlmodels/User";
import {Oauth2AccessTokenInstance, Oauth2AccessTokenAttributes} from "../../model/mysqlmodels/Oauth2AccessToken";
import {Oauth2RefreshTokenInstance, Oauth2RefreshTokenAttributes} from "../../model/mysqlmodels/Oauth2RefreshToken";
import {Config} from "../../config/envirment/config";


export class socialService {
  User: Sequelize.Model<UserInstance,UserAttributes>;
  AccessToken: Sequelize.Model<Oauth2AccessTokenInstance,Oauth2AccessTokenAttributes>
  RefreshToken: Sequelize.Model<Oauth2RefreshTokenInstance,Oauth2RefreshTokenAttributes>
  clientId: string

  setClientId(clientId) {
    this.clientId = clientId;
  }

  constructor() {
    this.User = model.User;
    this.AccessToken = model.Oauth2AccessToken;
    this.RefreshToken = model.Oauth2RefreshToken;
  }

  findorCreate = (user)=> {
    return this.User.findOne({where: {google: user.googleId, facebook: user.facebook, wechat: user.wechat}})
      .then(found=> {
        if (!found)
          return this.User.create({
            google: user.googleId,
            facebook: user.facebook,
            wechat: user.wechat,
            displayname:user.displayname
          });
        else
          return found;
      });
  }

  generateToken = (user)=> {
    var tokenValue = crypto.randomBytes(32).toString('hex');
    var refreshTokenValue = crypto.randomBytes(32).toString('hex');
    return Promise.resolve()
      .then(()=> {
        return this.AccessToken.destroy({where: {userId: user.userId, clientId: this.clientId}})
      })
      .then(()=> {
        return this.RefreshToken.destroy({where: {userId: user.userId, clientId: this.clientId}})
      })
      .then(()=> {
        return this.AccessToken.create({userId: user.userId, clientId: this.clientId, token: tokenValue});
      })
      .then(()=> {
        return this.RefreshToken.create({userId: user.userId, clientId: this.clientId, token: refreshTokenValue});
      })
      .then(()=> {
        return {
          access_token: tokenValue,
          refresh_token: refreshTokenValue,
          expires_in: Config.current.tokenLife,
          token_type: "Bearer"
        }
      });
  }


}


export default new socialService();

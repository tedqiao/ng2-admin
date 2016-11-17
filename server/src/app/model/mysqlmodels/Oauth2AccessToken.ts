import * as Sequelize from 'sequelize';

export interface Oauth2AccessTokenAttributes {
  userId: number;
  clientId: any;
  token: string;
}


export interface Oauth2AccessTokenInstance extends Sequelize.Instance<Oauth2AccessTokenAttributes> {
  createdAt: Date;
  updatedAt: Date;

  userId: number;
  clientId: any;
  token: string;
}


export default function defineOauth2AccessToken(sequelize: Sequelize.Sequelize, DataTypes) {
  var AccessToken = sequelize.define<Oauth2AccessTokenInstance,Oauth2AccessTokenInstance>('Oauth2AccessToken', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'oauth2_access_token'
  })

  return AccessToken;
}




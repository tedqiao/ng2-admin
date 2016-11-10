import * as Sequelize from 'sequelize';

export interface Oauth2RefreshTokenAttributes {
  userId: number;
  clientId: string;
  token: string;
}


export interface Oauth2RefreshTokenInstance extends Sequelize.Instance<Oauth2RefreshTokenAttributes> {
  createdAt: Date;
  updatedAt: Date;

  userId: number;
  clientId: string;
  token: string;
}


export default function defineOauth2RefreshAccessToken(sequelize: Sequelize.Sequelize, DataTypes) {
  var AccessToken = sequelize.define<Oauth2RefreshTokenInstance,Oauth2RefreshTokenAttributes>('Oauth2RefreshToken', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    clientId: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    token: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },{
    tableName:"oauth2_refresh_token"
  });

  return AccessToken;
}




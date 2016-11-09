import * as Sequelize from 'sequelize';


export interface Oauth2ClientAttributes {
  name: string;
  clientId: string;
  clientSecret: string;
}


export interface Oauth2ClientInstance extends Sequelize.Instance<Oauth2ClientAttributes> {
  createdAt: Date;
  updatedAt: Date;

  name: string;
  clientId: string;
  clientSecret: string;
}

export default function defindOauth2Client(sequelize: Sequelize.Sequelize, DataTypes) {
  var Oauth2Client = sequelize.define<Oauth2ClientInstance,Oauth2ClientAttributes>('Oauth2Client', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    clientId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    clientSecret: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }

  }, {
    classMethods: {
      associate: function (models) {
        Oauth2Client.belongsToMany(models.User, {
          foreignKey: 'clientId',
          through: 'Oauth2AccessToken',
          otherKey: 'userId'
        });

        Oauth2Client.belongsToMany(models.User, {
          foreignKey: 'clientId',
          through: 'Oauth2RefreshToken',
          otherKey: 'userId'
        });
      }
    },
    tableName: 'oauth2_client'
  });

  return Oauth2Client;
}

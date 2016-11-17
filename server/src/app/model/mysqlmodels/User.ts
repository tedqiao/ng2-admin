import * as Sequelize from 'sequelize';
import * as crypto from 'crypto';

export interface UserAttributes {
  email: string;
  username: string;
  password: string;
  google: string;
  facebook: string;
  wechat: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  //  exposing every DB column as an instance field to so that tsc won't complain.
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  username: string;
  password: string;
  salt: string;
  google: string;
  facebook: string;
  wechat: string;
  checkPassword: Function;
}


export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes) {
  var User = sequelize.define<UserInstance,UserAttributes>('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function (val) {
        this.setDataValue('email', val.toLowerCase());
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function (password) {
        this.setDataValue('salt', crypto.randomBytes(32).toString('hex'));
        this.setDataValue('password', this.encryptPassword(password));
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    google: {
      type: DataTypes.STRING
    },
    facebook: {
      type: DataTypes.STRING
    },
    wechat: {
      type: DataTypes.STRING,

    }
  }, {
    classMethods: {
      associate: function (models) {
        User.belongsToMany(models.Oauth2Client, {
          foreignKey: 'userId',
          through: 'Oauth2AccessToken',
          otherKey: "clientId"
        });
        User.belongsToMany(models.Oauth2Client, {
          foreignKey: 'userId',
          through: 'Oauth2RefreshToken',
          otherKey: "clientId"
        });
      }
    },
    instanceMethods: {
      encryptPassword: function (password) {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
      },
      checkPassword: function (password) {
        return this.encryptPassword(password) === this.password;
      }
    }
    ,
    tableName: "user"
  });

  return User;
}

export interface IAppConfig {
  name: string;

}

export interface IConfigEnv {
  mysql: any;
  app: IAppConfig;
  port: number;
  mongoConnectionString: string;
  tokenLife: number;
}

export class Config {
  static env = process.env.NODE_ENV || 'development';
  static development = {
    app: {
      name: ''
    },
    port: process.env.PORT || 3000,
    mongoConnectionString: 'mongodb://localhost/db',
    mysql: {
      username: "root",
      password: "qiaojian123",
      database: "ng-admin",
      host: "127.0.0.1",
      dialect: "mysql",
      logging:false
    },
    tokenLife: 100
  };
  static production = {
    app: {
      name: ''
    },
    port: process.env.PORT || 3000,
    mongoConnectionString: process.env.MONGODB,
    mysql: {
      username: "root",
      password: "qiaojian123",
      database: "ng-admin",
      host: "127.0.0.1",
      dialect: "mysql",
      logging:true
    },
    tokenLife: 3600
  };


  static current: IConfigEnv = Config[Config.env];
}
;

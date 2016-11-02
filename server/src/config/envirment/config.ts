export interface IAppConfig
{
  name:string;
}

export interface IConfigEnv
{
  app: IAppConfig;
  port: number;
  mongoConnectionString: string;
}

export class Config {
  static env = process.env.NODE_ENV || 'development';
  static development= {
    app: {
      name: ''
    },
    port: process.env.PORT || 3000,
    mongoConnectionString: 'mongodb://localhost/db',
  };
  static production= {
    app: {
      name: ''
    },
    port: process.env.PORT || 3000,
    mongoConnectionString: process.env.CUSTOMCONNSTR_MONGODB,

  }
  static current:IConfigEnv = Config[Config.env];
};
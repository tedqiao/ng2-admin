declare module "oauth2orize" {

  export function createServer();
  export var exchange: any;
}


declare module "passport-oauth2-client-password" {
  var Strategy: any;
  export = Strategy;
}

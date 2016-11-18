var facebookfields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];


export default {
  google: {
    accessTokenUrl: 'https://accounts.google.com/o/oauth2/token',
    userApiUrl: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
    redirect_uri: "http://localhost:3000",
    client_id: "698746417760-t7ac2jmprhkpvrp4m3f1g8h410m08r4f.apps.googleusercontent.com",
    client_secret: "uT6g2fba5focFZXMT3EuMzwY"
  },
  facebook: {
    accessTokenUrl: 'https://graph.facebook.com/v2.5/oauth/access_token',
    userApiUrl: 'https://graph.facebook.com/v2.5/me?fields=' + facebookfields.join(','),
    redirect_uri: "http://localhost:3000/",
    client_id: "1129165283812467",
    client_secret: "1f5c65188020e35eecd139eecfa58ec2"
  }
}

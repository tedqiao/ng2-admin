import * as http from 'http';
import app from './app/app';
import db from './app/model/mysqlmodels';

//noinspection TypeScriptValidateTypes
var port = app.get('port');
var BootstrapApp = function () {
  var server = http.createServer(app);

  server.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is listening on port:' + port);
  });
}

db.sequelize.sync({force: true}).then(()=> {
  BootstrapApp();
}).then(()=> {
  db.User.create({username: "andrey", email: "andry@gmil.com", password: "simplepassword"});
  db.Oauth2Client.create({name:"mobile",clientId:"mobileV1",clientSecret:"abc123456"});
})
  .catch((err)=> {
    console.log(err);
  })





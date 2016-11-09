import BaseRepository = require("../../common/BaseRepository");
import User = require("./../../model/schema/User");
import {IUser} from "../../model/interfaces/IUser";


class UserRepository extends BaseRepository<IUser> {

  constructor() {
    super(User);
  }

  updateField(username: string, field: string, value: any, callback) {
    var query = {username: username};
    var fields = {};
    fields[field] = value;
    this._model.update(query, fields, callback);
  }

  findByField(field:string,value:any,callback:(err:any,result:any)=>void){
    var query = {};
    query[field] = value;
    this._model.find(query,callback);
  }

}

Object.seal(UserRepository);
export = UserRepository;

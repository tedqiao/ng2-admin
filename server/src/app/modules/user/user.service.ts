import BaseService = require("../../common/BaseService");
import {IUser} from "../../model/interfaces/IUser";
import UserRepository = require("./user.repository");


class UserService implements BaseService<IUser> {
  private _userRepo: UserRepository;

  constructor() {
    this._userRepo = new UserRepository();
  }

  retrieve(callback: (error: any, result: IUser)=>void) {
    this._userRepo.retrieve(callback);
  };

  findById(_id: string, callback: (error: any, result: IUser)=>void) {
    this._userRepo.findById(_id, callback);
  };

  create(user: IUser, callback: (error: any, result: any)=>void) {
    this._userRepo.create(user, callback);
  };

  update(_id: string, user: IUser, callback: (error: any, result: any)=>void) {
    this._userRepo.update(_id, user, callback);
  };

  delete(_id: string, callback: (error: any, result: any)=>void) {
    this._userRepo.delete(_id, callback);
  };

  findByUsername(username:string,callback:(error: any, result: any)=>void){
    this._userRepo.findByField("username",username,callback);
  }

  findByEmail(email:string,callback:(error: any, result: any)=>void){
    this._userRepo.findByField("email",email,callback);
  }

}

Object.seal(UserService);
export = UserService;

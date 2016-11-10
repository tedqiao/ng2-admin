import  {BaseService} from "../../common/BaseService";
import {Observable} from "rxjs";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UserNotFoundException} from "../../common/Exceptions/UserNotFound";
import {UserAttributes} from "../../model/mysqlmodels/User";


export class UserService extends BaseService {

  constructor() {
    super();

  }

  retrieve(): Observable<Object> {
    return Observable.fromPromise(this.db.User.findAll())
      .map((data)=> {
        if (!data)
          throw new UserNotFoundException();
        else
          return data;
      });
  };

  findById(_id: string): Observable<Object> {
    return Observable.fromPromise(this.db.User.findById(parseInt(_id, 10), {attributes: ['userId', 'username', 'email',]}))
      .map((data)=> {
        if (!data)
          throw new UserNotFoundException();
        else
          return data;
      });
  };

  create(user: UserAttributes): Observable<Object> {
    return Observable.fromPromise(this.db.User.create(user))
      .map((user)=> {
        return user;
      });

  };

  update(_id: string, query: Object): Observable<Object> {

    return Observable.fromPromise(this.db.User.update(query, {where: {userId: parseInt(_id, 10)}}))
      .map((data)=> {
        if (data[0] === 0)
          throw new UserNotFoundException();
        else
          return data;
      });
  };

  delete(_id: string, callback: (error: any, result: any)=>void) {

  };

  findByUsername(username: string) {
    return Observable.fromPromise(this.db.User.find({where: {username: username}}))
      .map((data)=> {
        if (!data)
          throw new UserNotFoundException();
        else
          return data;
      });
  }

  findByEmail(email: string) {
    return Observable.fromPromise(this.db.User.find({where: {email: email}}))
      .map((data)=> {
        if (!data)
          throw new UserNotFoundException();
        else
          return data;
      });
  }

}



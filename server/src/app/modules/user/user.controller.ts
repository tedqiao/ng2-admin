import {UserService} from "./user.service";
import * as express from'express';
import {UserAttributes} from "../../model/mysqlmodels/User";


export class UserController {
  private _userService: UserService

  constructor() {
    this._userService = new UserService();
  }

  retrieve = (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    this._userService.retrieve()
      .subscribe((data)=> {
        res.json(data);
      }, (err)=> {
        next(err);
      });
  }

  findById: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    this._userService.findById(req.authInfo.userId)
      .subscribe((data)=> {
        res.json(data);
      }, (err)=> {
        next(err);
      })
  };

  create = (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    console.log(req.body);
    this._userService.create(<UserAttributes>req.body)
      .subscribe((data)=> {
        res.json(data);
      }, (err)=> {
        next(err);
      });
  };

  update = (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    this._userService.update(req.params.id, req.body)
      .subscribe(()=> {
          res.json({status:"ok"});
      }, (err)=> {
        next(err);
      });
  };

  delete = (req: express.Request, res: express.Response)=> {
    //do not need delete;
  };

}


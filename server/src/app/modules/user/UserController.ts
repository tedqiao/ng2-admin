import {BaseController} from "../../common/BaseController";
import UserService = require("./UserService");
import express = require('express');
import {IUser} from "../../model/interfaces/IUser";


class UserController implements BaseController {
  private _userService: UserService

  constructor() {
    this._userService = new UserService();
  }

  retrieve = (req: express.Request, res: express.Response)=> {
    try {
      this._userService.retrieve((err, result)=> {
        if (err) {
          res.json({error: err});
        }
        res.json(result);
      });
    } catch (err) {
      console.log(err);
    }
  };

  findById = (req: express.Request, res: express.Response)=> {
    try {
      this._userService.findById(req.params.id, (err, result)=> {
        res.json(result);
      })
    } catch (err) {
      console.log(err);
    }
  };

  create = (req: express.Request, res: express.Response)=> {
    try {
      var user: IUser = <IUser>req.body;
      this._userService.create(user, (err, result)=> {
        if (err) {
          res.json({error: err});
        }
        res.json(result);
      })
    } catch (err) {
      console.log(err);
    }
  };

  update = (req: express.Request, res: express.Response)=> {
    try {
      var id = req.params.id;
      var user = <IUser>req.body;
      this._userService.update(id, user, (err, result)=> {
        if (err)
          res.json({error: err});
        res.json(result);
      })
    } catch (err) {
      console.log(err);
    }
  };

  delete = (req: express.Request, res: express.Response)=> {
    try {
      var _id = req.params.id;
      this._userService.delete(_id,(err,result)=>{
        if(err)
          res.json(err);
        res.json(result);
      })
    } catch (err) {
      console.log(err);
    }
  };

}

export = UserController;

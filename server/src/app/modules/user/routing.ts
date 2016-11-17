import * as express from "express";

import * as passport from 'passport';
import {UserController} from "./user.controller";

var router = express.Router();

class UserRouter {
  private _userController: UserController

  constructor() {
    this._userController = new UserController();
  }

  get Routers() {

    router.get("/", passport.authenticate('bearer', {session: false}), this._userController.retrieve);

    router.get("/me", passport.authenticate('bearer', {session: false}), this._userController.findById);

    router.post("/", this._userController.create);

    router.delete("/:id", this._userController.delete);

    router.put("/:id", this._userController.update);

    return router;
  }

}

export default new UserRouter();

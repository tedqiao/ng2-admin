import express = require("express");
import UserService = require("./user.service");
import UserController = require("./user.controller");

var router = express.Router();

class UserRouter {
  private _userController: UserController

  constructor() {
    this._userController = new UserController();
  }

  get Routers() {
    router.get("/", this._userController.retrieve);

    router.get("/:id", this._userController.findById);

    router.post("/", this._userController.create);

    router.delete("/:id",this._userController.delete);

    router.put("/:id",this._userController.update);

    router.patch("/");

    return router;
  }

}

Object.seal(UserRouter);
export = new UserRouter();

import express = require("express");

var router = express.Router();

class PoiRouter {

  get Routers() {
    router.get("", (req: express.Request, res: express.Response)=> {
      res.json({status: "ok"});
    });
    return router;
  }

}

Object.seal(PoiRouter);
export = new PoiRouter();

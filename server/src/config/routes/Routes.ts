import express = require('express');
import poiRouter = require('./poiRouters');
import userRouter = require("../../app/modules/user/routing");

var router = express.Router();


//noinspection TypeScriptValidateTypes
router.use("/poi", poiRouter.Routers);
//noinspection TypeScriptValidateTypes
router.use("/user",userRouter.Routers);

export = router;

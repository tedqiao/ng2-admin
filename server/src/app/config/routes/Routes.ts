import express = require('express');
import poiRouter = require('./poiRouters');
import {UserRouter} from "./../../modules/user/routing";

var router = express.Router();


//noinspection TypeScriptValidateTypes
router.use("/poi", poiRouter.Routers);
//noinspection TypeScriptValidateTypes
router.use("/user",new UserRouter().Routers);

export = router;

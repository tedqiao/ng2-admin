import {default as DB} from './../model/mysqlmodels/index';

export class BaseService{

  public db;

  constructor() {
    this.db = DB;
  }

}


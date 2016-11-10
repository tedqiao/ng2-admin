import * as express from 'express';

export interface BaseController {
  retrieve: express.RequestHandler;
  findById: express.RequestHandler;
  create: express.RequestHandler;
  update: express.RequestHandler;
  delete: express.RequestHandler;

}

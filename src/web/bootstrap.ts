import "reflect-metadata";

import { Container } from "inversify";
import {
  InversifyExpressServer,
} from "inversify-express-utils";
import {
  makeLoggerMiddleware,
} from "inversify-logger-middleware";

import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";

import * as config from "@config";
import * as Errors from "@middlewares/error";

import { registerControllers } from "@controllers/assembly";
import { registerServices } from "@services/assembly";

import {
  addErrorMiddleware,
  registerMiddlewares,
} from "@middlewares/assembly";

const container = new Container();

if (!config.server.isProduction) {
  const logger = makeLoggerMiddleware();
  container.applyMiddleware(logger);
}

const registerInjections = (con: Container) => {

  registerMiddlewares(con);
  registerServices(con);
  registerControllers(con);
};

registerInjections(container);

const server = new InversifyExpressServer(container);
export default server.setConfig((app: express.Application) => {

  app.use(morgan("combined"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

}).setErrorConfig((app: express.Application) => {
  if (config.server.isProduction) {
    app.use(addErrorMiddleware(container, Errors.Generic.Assembly.name));
  }
}).build();

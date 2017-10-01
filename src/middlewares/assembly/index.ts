import * as express from "express";
import { Container } from "inversify";

import * as Errors from "@middlewares/error";

const Assembly = {
};

const registerMiddlewares = (container: Container) => {
  container.bind<express.ErrorRequestHandler>(Errors.Generic.Assembly.name).toConstantValue(Errors.Generic.default);
};

const addMiddleware = (container: Container, name: string): express.RequestHandler => {
  return container.get<express.RequestHandler>(name);
};

const addErrorMiddleware = (container: Container, name: string): express.ErrorRequestHandler => {
  return container.get<express.ErrorRequestHandler>(name);
};

export {
  registerMiddlewares,
  addMiddleware,
  addErrorMiddleware,
  Assembly,
};

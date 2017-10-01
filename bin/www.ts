/// <reference types="node" />

import * as config from "@config";
import * as Bluebird from "bluebird";
import { createServer } from "http";
import * as logger from "winston";

import app from "../src/web/bootstrap";

const server = createServer(app);
const port = config.server.port;

const serverListen = Bluebird.promisify<void, string>(server.listen,  { context: server });
serverListen(port)
  .then(() => logger.info(`App is listening on port ${port}`))
  .catch((error) => logger.error(`Error (${error}) happened during server start`));

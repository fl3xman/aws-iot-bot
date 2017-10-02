import * as config from "@config";
import * as Bluebird from "bluebird";
import { createServer } from "http";

import app from "./web/bootstrap";

const server = createServer(app);
const port = config.server.port;

const serverListen = Bluebird.promisify<void, string>(server.listen,  { context: server });
serverListen(port)
  // tslint:disable-next-line:no-console
  .then(() => console.log(`App is listening on port ${port}`))
  // tslint:disable-next-line:no-console
  .catch((error) => console.log(`Error (${error}) happened during server start`));

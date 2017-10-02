import * as dotenv from "dotenv";

import aws from "./components/aws";
import facebook from "./components/facebook";
import server from "./components/server";

if (!server.isProduction) {
  dotenv.config();
}

export {
  aws,
  facebook,
  server,
};

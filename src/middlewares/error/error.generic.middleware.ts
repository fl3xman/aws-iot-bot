import { ErrorFactory } from "@utils/errors";
import * as HttpStatus from "http-status-codes";
import * as logger from "winston";

const Assembly = {
  name: "ErrorGenericMiddleware",
};

export {
  Assembly,
};

export default (err: any, req: any, res: any, next: any) => {

  logger.error(err.stack);
  const error = ErrorFactory.createHttp(HttpStatus.INTERNAL_SERVER_ERROR);
  res
    .status(error.status)
    .json({ error: error.description });
};

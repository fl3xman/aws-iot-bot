import { ErrorFactory } from "@utils/errors";
import * as HttpStatus from "http-status-codes";

const Assembly = {
  name: "ErrorGenericMiddleware",
};

export {
  Assembly,
};

export default (err: any, req: any, res: any, next: any) => {

  // tslint:disable-next-line:no-console
  console.log(err.stack);
  const error = ErrorFactory.createHttp(HttpStatus.INTERNAL_SERVER_ERROR);
  res
    .status(error.status)
    .json({ error: error.description });
};

import * as AWS from "aws-sdk";
import * as HttpStatus from "http-status-codes";

import HttpError from "./http.error";
import IStatusError from "./status.error.api";

export default class ErrorFactory  {

  public static createHttp(status: number, message?: any): IStatusError {
    return new HttpError(status, message);
  }

  public static createHttpFromAWS(error: AWS.AWSError): IStatusError {
    const status = error.statusCode || HttpStatus.CONFLICT;
    const message = `AWS Error(${error.code}): ${error.name} - ${error.message}`;
    return this.createHttp(status, message);
  }
}

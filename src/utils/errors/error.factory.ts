import HttpError from "./http.error";
import IStatusError from "./status.error.api";

export default class ErrorFactory  {

  public static createHttp(status: number, message?: any): IStatusError {
    return new HttpError(status, message);
  }
}

import * as HttpStatus from "http-status-codes";
import IStatusError from "./status.error.api";

import BaseError from "./base.error";

export default class HttpError extends BaseError implements IStatusError {

  // tslint:disable-next-line:variable-name
  private _status: number;

  constructor(status: number, message?: any) {
    super(message || HttpStatus.getStatusText(status));
    this._status = status;
  }

  public get status(): number {
    return this._status;
  }

  public get description(): string {
    return this.message;
  }
}

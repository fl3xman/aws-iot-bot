import * as express from "express";
import * as qs from "querystring";
import * as url from "url";

import * as HttpStatus from "http-status-codes";

import { Container, inject, injectable } from "inversify";
import {
  controller, httpGet, httpPost, interfaces, request, requestBody, response,
} from "inversify-express-utils";

import * as config from "@config";
import FacebookService, { Assembly as FacebookAssembly } from "@services/facebook";

const Assembly = {
  name: "FacebookController", type: Symbol("FacebookController"),
};

export {
  Assembly,
};

export default (container: Container) => {

  @injectable()
  @controller("/facebook/webhooks")
  class FacebookController implements interfaces.Controller {

    public static getAssembly(): any {
      return Assembly;
    }

    constructor(
      @inject(FacebookAssembly.type) private service: FacebookService,
    ) {}

    @httpGet("/")
    public verify(
      @request() req: express.Request,
      @response() res: express.Response,
    ): void {

      const { tokens } = config.facebook;
      const query = qs.parse(url.parse(req.url).query);

      if (query["hub.verify_token"] === tokens.verify) {
        res.send(query["hub.challenge"]);
      } else {
        res.send("Facebook was not verified.");
      }
    }

    @httpPost("/")
    public receiveMessages(
      @request() req: express.Request,
      @response() res: express.Response,
    ): void {

      res.sendStatus(HttpStatus.OK);
      this.service.processMessages(req.body);
    }

  }

  return FacebookController;
};

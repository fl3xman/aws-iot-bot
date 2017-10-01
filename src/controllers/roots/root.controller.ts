import { Container, injectable } from "inversify";
import {
  controller, httpGet, interfaces,
} from "inversify-express-utils";

const Assembly = {
  name: "RootController", type: Symbol("RootController"),
};

export {
  Assembly,
};

export default (container: Container) => {

  @injectable()
  @controller("/")
  class RootController implements interfaces.Controller {

    public static getAssembly(): any {
      return Assembly;
    }

    @httpGet("/")
    public getRoot(): Promise<string> {
      return Promise.resolve("Welcome to iot chatbot.");
    }
  }
  return RootController;
};

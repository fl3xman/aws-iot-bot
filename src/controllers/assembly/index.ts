import { Container } from "inversify";
import {
  interfaces, TYPE,
} from "inversify-express-utils";

import * as FacebookController from "@controllers/facebook";
import * as RootController from "@controllers/roots";

const registerControllers = (container: Container) => {

  const root = RootController.default(container);
  const facebook = FacebookController.default(container);

  container.bind<interfaces.Controller>(TYPE.Controller).to(root).whenTargetNamed(RootController.Assembly.name);
  container.bind<interfaces.Controller>(TYPE.Controller).to(facebook).whenTargetNamed(FacebookController.Assembly.name);
};

export {
  registerControllers,
};

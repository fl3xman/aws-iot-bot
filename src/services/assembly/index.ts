import * as AWS from "aws-iot-device-sdk";

import { Container } from "inversify";

import * as config from "@config";
import FacebookService, { Assembly as FacebookAssembly } from "@services/facebook";

const Assembly = {
  AWS: {
    thingShadow: {
      name: "thingShadow", type: Symbol("thingShadow"),
    },
  },
};

const registerServices = (container: Container) => {
  container.bind<AWS.thingShadow>(Assembly.AWS.thingShadow.type).toDynamicValue((context) => {
    return new AWS.thingShadow({
      caPath: config.aws.credentials.ca,
      certPath: config.aws.credentials.crt,
      clientId: config.aws.client,
      host: config.aws.host,
      keyPath: config.aws.credentials.private,
    });
  }).inSingletonScope();
  container.bind<FacebookService>(FacebookAssembly.type).to(FacebookService);
};

export {
  registerServices,
};

export default Assembly;

import * as AWS from "aws-sdk";

import { Container } from "inversify";

import FacebookService, { Assembly as FacebookAssembly } from "@services/facebook";

const Assembly = {
  AWS: {
    Iot: {
      name: "Iot", type: Symbol("Iot"),
    },
    IotData: {
      name: "IotData", type: Symbol("IotData"),
    },
  },
};

const registerServices = (container: Container) => {
  container.bind<AWS.Iot>(Assembly.AWS.Iot.type).toDynamicValue((context) => {
    return new AWS.Iot();
  }).inSingletonScope();
  container.bind<AWS.IotData>(Assembly.AWS.IotData.type).toDynamicValue((context) => {
    return new AWS.IotData();
  }).inSingletonScope();
  container.bind<FacebookService>(FacebookAssembly.type).to(FacebookService).inSingletonScope();
};

export {
  registerServices,
};

export default Assembly;
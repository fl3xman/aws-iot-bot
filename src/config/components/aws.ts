/// <reference types="node" />

import * as joi from "joi";
import * as path from "path";

const schema = joi.object({
  AWS_CLIENT_ID: joi.string()
    .default("576916018733"),
  AWS_HOST: joi.string()
    .default("a2fo0j0u55vbhj.iot.eu-central-1.amazonaws.com"),
  AWS_THING: joi.string()
    .default("DemoLedThing"),
}).unknown()
    .required();

const { error, value: env } = joi.validate(process.env, schema);
if (error) {
  throw new Error(`Server config validation error: ${error.message}`);
}

export default {
  client: env.AWS_CLIENT_ID,
  credentials: {
    ca: path.resolve("cert/root-CA.crt"),
    crt: path.resolve("cert/f84fba1380-certificate.pem.crt"),
    private: path.resolve("cert/f84fba1380-private.pem.key"),
  },
  host: env.AWS_HOST,
  thing: env.AWS_THING,
};

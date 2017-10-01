/// <reference types="node" />

import * as joi from "joi";

const schema = joi.object({
  NODE_ENV: joi.string()
    .allow(["development", "production", "test"])
    .default("development"),
  PORT: joi.number()
    .default(3070),
}).unknown()
    .required();

const { error, value: env } = joi.validate(process.env, schema);
if (error) {
  throw new Error(`Server config validation error: ${error.message}`);
}

export default {
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === "production",
  port: env.PORT,
};

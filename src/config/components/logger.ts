import * as joi from "joi";
import * as logger from "winston";

const schema = joi.object({
  LOGGER_ENABLED: joi.boolean()
    .truthy("TRUE")
    .truthy("true")
    .falsy("FALSE")
    .falsy("false")
    .default(true),
}).unknown()
    .required();

const { error, value: env } = joi.validate(process.env, schema);
if (error) {
  throw new Error(`Logger config validation error: ${error.message}`);
}

const config = {
  enabled: env.LOGGER_ENABLED,
};

if (!config.enabled) {
  logger.remove(logger.transports.Console);
}

export default config;

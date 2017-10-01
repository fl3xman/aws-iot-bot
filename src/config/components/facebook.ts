import * as joi from "joi";

const schema = joi.object({
  FB_DEBUG: joi.boolean()
    .truthy("TRUE")
    .truthy("true")
    .falsy("FALSE")
    .falsy("false")
    .default(false),
  FB_PAGE_ACCESS_TOKEN: joi.string()
    .required(),
  FB_VERIFY_TOKEN: joi.string()
    .required(),
}).unknown()
  .required();

const { error, value: env } = joi.validate(process.env, schema);
if (error) {
  throw new Error(`Facebook config validation error: ${error.message}`);
}

export default {
  api: "v2.9",
  debug: env.FB_DEBUG,
  id: env.FB_APP_ID,
  tokens: {
    access: env.FB_PAGE_ACCESS_TOKEN,
    verify: env.FB_VERIFY_TOKEN,
  },
};

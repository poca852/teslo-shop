import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required(),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.required(),
  DB_USERNAME: Joi.required(),
  PORT: Joi.required().default(3000),
  HOST_API: Joi.required().default('http://localhost:3000/api'),
});
import * as Joi from 'joi';
export interface IAppConfig {
  MONGODB_URI: string;
  AUTH_HOST: string;
  AUTH_PORT: number;
  PAYMENTS_HOST: string;
  PAYMENTS_PORT: 3003;
  PORT: number;
}

export default (): IAppConfig => {
  const {
    MONGODB_URI,
    PORT,
    AUTH_HOST,
    AUTH_PORT,
    PAYMENTS_HOST,
    PAYMENTS_PORT,
  } = process.env;

  const envVariables = {
    MONGODB_URI,
    PORT,
    AUTH_HOST,
    AUTH_PORT,
    PAYMENTS_HOST,
    PAYMENTS_PORT,
  };
  const schema = Joi.object<IAppConfig, true>({
    MONGODB_URI: Joi.string().uri().required(),
    PORT: Joi.number().required(),
    AUTH_HOST: Joi.string().required(),
    AUTH_PORT: Joi.number().required(),
    PAYMENTS_HOST: Joi.string().required(),
    PAYMENTS_PORT: Joi.number().required(),
  });
  const { error, value } = schema.validate(envVariables, { abortEarly: false });
  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }
  return value;
};

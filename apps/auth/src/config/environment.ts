import * as Joi from 'joi';
export interface IAppConfig {
  JWT_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: string;
  MONGODB_URI: string;
  PORT: number;
}

export default (): IAppConfig => {
  const { JWT_SECRET, PORT, JWT_ACCESS_TOKEN_EXPIRATION_TIME, MONGODB_URI } =
    process.env;

  const envVariables = {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    MONGODB_URI,
    PORT,
  };
  const schema = Joi.object<IAppConfig, true>({
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    MONGODB_URI: Joi.string().uri().required(),
    PORT: Joi.number().required(),
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

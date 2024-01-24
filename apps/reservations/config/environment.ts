import * as Joi from 'joi';
export interface IAppConfig {
  MONGODB_URI: string;
  PORT: number;
}

export default (): IAppConfig => {
  const { MONGODB_URI, PORT } = process.env;

  const envVariables = {
    MONGODB_URI,
    PORT,
  };
  const schema = Joi.object<IAppConfig, true>({
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

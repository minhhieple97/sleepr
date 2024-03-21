import * as Joi from 'joi';
export interface IAppConfig {
  TCP_PORT: number;
  HTTP_PORT: number;
  STRIPE_SECRET_KEY: string;
}
export default (): IAppConfig => {
  const { TCP_PORT, HTTP_PORT, STRIPE_SECRET_KEY } = process.env;
  const envVariables = {
    TCP_PORT,
    HTTP_PORT,
    STRIPE_SECRET_KEY,
  };
  const schema = Joi.object<IAppConfig, true>({
    TCP_PORT: Joi.number().required(),
    HTTP_PORT: Joi.number().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
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

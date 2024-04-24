import * as Joi from 'joi';
export interface IAppConfig {
  TCP_PORT: number;
}

export default (): IAppConfig => {
  const { TCP_PORT } = process.env;

  const envVariables = {
    TCP_PORT,
  };
  const schema = Joi.object<IAppConfig, true>({
    TCP_PORT: Joi.number().required(),
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

import * as Joi from 'joi';

export function configuration(): Record<string, any> {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      type: process.env.DB_TYPE || 'postgres',
      synchronize: false,
      logging: true,
      host: process.env.DB_HOST || 'masterHost',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'username',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'dbname',
      schema: process.env.DB_SCHEMA || 'dev_blog',
      extra: {
        connectionLimit: 30,
      },
      autoLoadEntities: true,
    },
    UPLOADED_FILES_DESTINATION:
      process.env.UPLOADED_FILES_DESTINATION || './public/upload',
    jwt: {
      secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
  };
}

export const configurationValidate: Record<string, any> = {
  UPLOADED_FILES_DESTINATION: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
};

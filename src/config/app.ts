import 'dotenv/config';

export const PORT = process.env.APP_PORT ?? 3333;
export const ENV = process.env.NODE_ENV ?? 'development';
export const APP_NAME = process.env.APP_NAME ?? 'backend-template';
export const APP_VERSION = process.env.APP_VERSION ?? '1.0.0';

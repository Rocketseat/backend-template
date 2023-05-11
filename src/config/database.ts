import 'dotenv/config';

export const USER = process.env.DATABASE_USER ?? 'root';
export const PASSWORD = process.env.DATABASE_PASS ?? 'toor';
export const HOST = process.env.DATABASE_HOST ?? 'localhost';
export const PORT = process.env.DATABASE_PORT ?? '3306';
export const NAME = process.env.DATABASE_NAME ?? 'app';

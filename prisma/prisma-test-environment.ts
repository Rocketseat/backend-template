import type { Config } from '@jest/types';
import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import mysql from 'mysql2/promise';
import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import util from 'node:util';

import { HOST, PASSWORD, PORT, USER } from '../src/config/database';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: Config.ProjectConfig) {
    super(config);

    this.schema = `test_${crypto.randomUUID()}`;
    this.connectionString = `mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const client = await mysql.createConnection(this.connectionString);

    await client.connect();
    await client.query(
      `DROP DATABASE IF EXISTS \`${client.config.database}\`;`,
    );
    await client.end();
  }
}

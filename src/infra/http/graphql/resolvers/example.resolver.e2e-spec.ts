import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

describe('Example Resolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('(Query) helloWorld', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            helloWorld
          }
        `,
      })
      .expect(200);

    expect(response.body.data.helloWorld).toBe('Hello World!');
  });
});

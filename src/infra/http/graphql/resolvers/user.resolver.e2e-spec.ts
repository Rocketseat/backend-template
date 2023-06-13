import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';

import { UserFactory } from '@test/factories/users.factory';

describe('UserResolver (e2e)', () => {
  let app: INestApplication;
  let userFactory: UserFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, HttpModule],
      providers: [UserFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    userFactory = moduleRef.get(UserFactory);

    await app.init();
  });

  it('(Query) userByEmail', async () => {
    const user = await userFactory.makeUser();

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query UserByEmail ($email: String!){
            userByEmail(email: $email) {
              id
              email
              createdAt
            }
          }
        `,
        variables: {
          email: user.email,
        },
      })
      .expect(200);

    const {
      data: { userByEmail: output },
    } = response.body;

    expect(output).toMatchObject({
      id: expect.any(String),
      email: user.email,
    });
  });
});

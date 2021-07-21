import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', async () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const users = await request(app.getHttpServer())
      .get('/users')
      .set(`${process.env.API_HEADER_NAME}`, `${process.env.API_HEADER_SECRET}`)
      .expect(200);

    console.log(JSON.parse(users.text));
  });
});

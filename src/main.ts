import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function serverInit() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    await app.listen(4000);
    console.log('Server started');
  } catch (err) {
    console.error(`Error Starting server due ${err.message}`);
  }
}
serverInit();

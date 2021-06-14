import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

const { PORT } = process.env;

async function serverInit() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    await app.listen(PORT || 3000);
    console.log(`Server started on port ${PORT}`);
  } catch (err) {
    console.error(`Error Starting server due ${err.message}`);
  }
}
serverInit();

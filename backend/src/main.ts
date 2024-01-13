import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use((req, res, next) => {
    req.user = {
      id: 'rec_cmbuve91vhrpaedl0asg',
      username: 'yaldram',
      name: 'Arsalan Yaldram',
    };

    next();
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();

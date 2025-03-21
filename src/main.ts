import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();

// The  ValidationPipe  is a built-in pipe provided by NestJS that can be used to validate incoming data. In this case, we are using it to validate the incoming data of the request body.

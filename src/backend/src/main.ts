import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import makeSwaggerConfig from './config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { VALIDATION_PIPE_CONFIG } from './config/validation.pipe';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_CONFIG));

  app.register(cookie, {
    secret: process.env.BACKEND_APP_KEY,
  } as FastifyCookieOptions);

  makeSwaggerConfig(app);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();

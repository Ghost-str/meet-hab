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
import { WinstonModule } from 'nest-winston';
import winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [new winston.transports.Console()],
      }),
    },
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

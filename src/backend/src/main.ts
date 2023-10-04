import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import makeSwaggerConfig from './config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { VALIDATION_PIPE_CONFIG } from './config/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_CONFIG));
  makeSwaggerConfig(app);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
